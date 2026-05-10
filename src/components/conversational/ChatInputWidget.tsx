"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import type { SelectOption, CascadingSelectConfig, InputType } from "./ConversationEngine";

/* ------------------------------------------------------------------ */
/*  ChatInputWidget — Dynamic input rendered per conversation step    */
/* ------------------------------------------------------------------ */

interface BaseInputProps {
  /** Called when the user submits their answer. */
  onSubmit: (value: unknown) => void;
  /** Placeholder / hint text. */
  placeholder?: string;
  /** Disable interaction (e.g. while bot is "typing"). */
  disabled?: boolean;
  /** Current locale for RTL and label direction. */
  locale: "en" | "ar";
}

/* ---- Text / Tel / Email ----------------------------------------- */

interface TextInputWidgetProps extends BaseInputProps {
  type: "text" | "tel" | "email";
  inputProps?: Record<string, unknown>;
}

export function TextInputWidget({
  type,
  onSubmit,
  placeholder,
  disabled,
  locale,
  inputProps,
}: TextInputWidgetProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value.trim());
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type={type}
        className="chat-input-text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        dir="auto"
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "off"}
        {...(inputProps as Record<string, string | number | boolean>)}
      />
      <button
        type="submit"
        className="chat-input-send"
        disabled={disabled}
        aria-label={locale === "ar" ? "إرسال" : "Send"}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </button>
    </form>
  );
}

/* ---- Number stepper --------------------------------------------- */

interface NumberInputWidgetProps extends BaseInputProps {
  min?: number;
  max?: number;
}

export function NumberInputWidget({
  onSubmit,
  placeholder,
  disabled,
  locale,
  min = 0,
  max = 100,
}: NumberInputWidgetProps) {
  const [value, setValue] = useState<number | "">(min);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (typeof value === "number") onSubmit(String(value));
  };

  return (
    <form className="chat-input-form chat-input-form--number" onSubmit={handleSubmit}>
      <div className="chat-number-stepper">
        <button
          type="button"
          className="chat-number-btn"
          onClick={() => setValue((v) => Math.max(min, (typeof v === "number" ? v : min) - 1))}
          disabled={disabled || value === min}
          aria-label={locale === "ar" ? "أقل" : "Decrease"}
        >
          −
        </button>
        <input
          type="number"
          className="chat-number-value"
          value={value}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (!isNaN(n)) setValue(Math.min(max, Math.max(min, n)));
          }}
          min={min}
          max={max}
          disabled={disabled}
        />
        <button
          type="button"
          className="chat-number-btn"
          onClick={() => setValue((v) => Math.min(max, (typeof v === "number" ? v : min) + 1))}
          disabled={disabled || value === max}
          aria-label={locale === "ar" ? "أكثر" : "Increase"}
        >
          +
        </button>
      </div>
      <button
        type="submit"
        className="chat-input-confirm"
        disabled={disabled || typeof value !== "number"}
      >
        {locale === "ar" ? "تأكيد" : "Confirm"}
      </button>
    </form>
  );
}

/* ---- Select (button grid) --------------------------------------- */

interface SelectWidgetProps extends BaseInputProps {
  options: SelectOption[];
}

export function SelectWidget({
  options,
  onSubmit,
  disabled,
}: SelectWidgetProps) {
  return (
    <div className="chat-select-grid" role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className="chat-select-option"
          onClick={() => onSubmit(opt.value)}
          disabled={disabled}
        >
          {opt.icon && <span className="chat-select-icon">{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ---- Multi-select (checkbox cards) ------------------------------ */

interface MultiSelectWidgetProps extends BaseInputProps {
  options: SelectOption[];
  minSelections?: number;
}

export function MultiSelectWidget({
  options,
  onSubmit,
  disabled,
  locale,
  minSelections = 1,
}: MultiSelectWidgetProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  return (
    <div className="chat-multiselect">
      <div className="chat-multiselect-grid" role="group">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`chat-multiselect-option ${selected.includes(opt.value) ? "chat-multiselect-option--active" : ""}`}
            onClick={() => toggle(opt.value)}
            disabled={disabled}
            aria-pressed={selected.includes(opt.value)}
          >
            <span className="chat-multiselect-check">
              {selected.includes(opt.value) ? "✓" : ""}
            </span>
            {opt.icon && <span className="chat-select-icon">{opt.icon}</span>}
            {opt.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="chat-input-confirm"
        onClick={() => onSubmit(selected)}
        disabled={disabled || selected.length < minSelections}
      >
        {locale === "ar"
          ? `تأكيد (${selected.length} ${selected.length === 1 ? "اختيار" : "اختيارات"})`
          : `Confirm (${selected.length} selected)`}
      </button>
    </div>
  );
}

/* ---- Cascading Select ------------------------------------------- */

interface CascadingSelectWidgetProps extends BaseInputProps {
  config: CascadingSelectConfig;
}

export function CascadingSelectWidget({
  config,
  onSubmit,
  disabled,
  locale,
}: CascadingSelectWidgetProps) {
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const secondaryOptions = primary ? config.getSecondaryOptions(primary) : [];

  return (
    <div className="chat-cascading">
      <select
        className="chat-cascading-select"
        value={primary}
        onChange={(e) => {
          setPrimary(e.target.value);
          setSecondary("");
        }}
        disabled={disabled}
      >
        <option value="">{config.primaryPlaceholder}</option>
        {config.primaryOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        className="chat-cascading-select"
        value={secondary}
        onChange={(e) => setSecondary(e.target.value)}
        disabled={disabled || !primary}
      >
        <option value="">{config.secondaryPlaceholder}</option>
        {secondaryOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <button
        type="button"
        className="chat-input-confirm"
        onClick={() =>
          onSubmit({
            [config.primaryField]: primary,
            [config.secondaryField]: secondary,
          })
        }
        disabled={disabled || !primary || !secondary}
      >
        {locale === "ar" ? "تأكيد" : "Confirm"}
      </button>
    </div>
  );
}
