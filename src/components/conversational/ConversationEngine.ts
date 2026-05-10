/**
 * ConversationEngine — A state-machine-driven chat flow controller.
 *
 * No LLM dependency: every step is pre-defined with typed input widgets,
 * validation rules, and bilingual bot messages. The engine simply advances
 * through steps, validates answers, and accumulates form data.
 */

import type { LocaleCode } from "@/types/site";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type InputType =
  | "text"
  | "number"
  | "tel"
  | "email"
  | "select"
  | "multi-select"
  | "cascading-select"
  | "review";

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

export interface CascadingSelectConfig {
  /** First-level options. */
  primaryOptions: SelectOption[];
  /** Returns second-level options based on the chosen primary value. */
  getSecondaryOptions: (primaryValue: string) => SelectOption[];
  primaryPlaceholder: string;
  secondaryPlaceholder: string;
  /** Field keys for primary and secondary values in the form state. */
  primaryField: string;
  secondaryField: string;
}

export interface ConversationStep<TForm = Record<string, unknown>> {
  /** Unique step identifier. */
  id: string;
  /** The form field(s) this step populates. */
  field: string | string[];
  /** Returns the bot message for this step, optionally using collected data. */
  botMessage: (ctx: Partial<TForm>, locale: LocaleCode) => string;
  /** Widget type rendered in the chat input area. */
  inputType: InputType;
  /** Extra props forwarded to the input widget (min, max, placeholder, options…). */
  inputProps?: Record<string, unknown>;
  /** Options for select / multi-select widgets. */
  options?: (locale: LocaleCode) => SelectOption[];
  /** Config for cascading-select widget. */
  cascadingConfig?: (locale: LocaleCode) => CascadingSelectConfig;
  /** Validates the user's answer. Return `{ valid: true }` or an error string. */
  validate: (value: unknown, locale: LocaleCode) => { valid: boolean; error?: string };
  /** Optional transform before storing the value in form state. */
  transform?: (value: unknown) => unknown;
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  /** Timestamp in ms. */
  ts: number;
}

export type ConversationStatus =
  | "idle"
  | "typing"     // bot "typing" indicator visible
  | "waiting"    // waiting for user input
  | "reviewing"  // on the review step
  | "submitting"
  | "success"
  | "error";

export interface ConversationState<TForm = Record<string, unknown>> {
  currentStep: number;
  formData: Partial<TForm>;
  messages: ChatMessage[];
  status: ConversationStatus;
  /** Error text shown on submit failure. */
  errorText: string;
  /** Registration/confirmation number after success. */
  confirmationId: string | null;
}

/* ------------------------------------------------------------------ */
/*  Engine helpers                                                     */
/* ------------------------------------------------------------------ */

let _msgCounter = 0;

function makeId(): string {
  _msgCounter += 1;
  return `msg-${Date.now()}-${_msgCounter}`;
}

export function createInitialState<TForm>(
  initialData?: Partial<TForm>
): ConversationState<TForm> {
  return {
    currentStep: 0,
    formData: (initialData ?? {}) as Partial<TForm>,
    messages: [],
    status: "idle",
    errorText: "",
    confirmationId: null,
  };
}

/**
 * Pushes a bot message and returns the updated messages array.
 */
export function addBotMessage(
  messages: ChatMessage[],
  text: string
): ChatMessage[] {
  return [
    ...messages,
    { id: makeId(), sender: "bot", text, ts: Date.now() },
  ];
}

/**
 * Pushes a user message and returns the updated messages array.
 */
export function addUserMessage(
  messages: ChatMessage[],
  text: string
): ChatMessage[] {
  return [
    ...messages,
    { id: makeId(), sender: "user", text, ts: Date.now() },
  ];
}

/**
 * Sets field(s) in formData from the step's answer value.
 *
 * - If step.field is a string, sets `formData[field] = value`.
 * - If step.field is an array (e.g. cascading-select), `value` must be a
 *   Record mapping each field name to its value.
 */
export function applyAnswer<TForm>(
  formData: Partial<TForm>,
  step: ConversationStep<TForm>,
  rawValue: unknown
): Partial<TForm> {
  const value = step.transform ? step.transform(rawValue) : rawValue;

  if (Array.isArray(step.field)) {
    // value should be a Record<string, unknown>
    const multi = value as Record<string, unknown>;
    const next = { ...formData };
    for (const key of step.field) {
      (next as Record<string, unknown>)[key] = multi[key];
    }
    return next;
  }

  return { ...formData, [step.field]: value } as Partial<TForm>;
}

/**
 * Returns a human-readable summary of the answer for display in a user bubble.
 */
export function formatAnswer(
  step: ConversationStep,
  value: unknown,
  locale: LocaleCode
): string {
  if (step.inputType === "multi-select" && Array.isArray(value)) {
    const opts = step.options?.(locale) ?? [];
    return value
      .map((v) => opts.find((o) => o.value === v)?.label ?? v)
      .join(", ");
  }

  if (step.inputType === "select") {
    const opts = step.options?.(locale) ?? [];
    const match = opts.find((o) => o.value === value);
    return match?.label ?? String(value);
  }

  if (step.inputType === "cascading-select" && typeof value === "object" && value !== null) {
    const cfg = step.cascadingConfig?.(locale);
    if (!cfg) return JSON.stringify(value);
    const rec = value as Record<string, string>;
    const priLabel =
      cfg.primaryOptions.find((o) => o.value === rec[cfg.primaryField])?.label ?? rec[cfg.primaryField];
    const secOptions = cfg.getSecondaryOptions(rec[cfg.primaryField]);
    const secLabel =
      secOptions.find((o) => o.value === rec[cfg.secondaryField])?.label ?? rec[cfg.secondaryField];
    return `${priLabel} — ${secLabel}`;
  }

  return String(value ?? "");
}
