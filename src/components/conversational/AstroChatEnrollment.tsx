"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { LocaleCode } from "@/types/site";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import {
  type ConversationState,
  type ConversationStep,
  createInitialState,
  addBotMessage,
  addUserMessage,
  applyAnswer,
  formatAnswer,
} from "./ConversationEngine";
import {
  enrollmentSteps,
  type EnrollmentChatForm,
} from "./steps/enrollmentSteps";
import { AstroAvatar, type AstroMood } from "./AstroAvatar";
import { ChatBubble, ChatWidgetBubble } from "./ChatBubble";
import {
  TextInputWidget,
  NumberInputWidget,
  SelectWidget,
  MultiSelectWidget,
  CascadingSelectWidget,
} from "./ChatInputWidget";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AstroChatEnrollmentProps {
  locale: LocaleCode;
  open: boolean;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AstroChatEnrollment({
  locale,
  open,
  onClose,
}: AstroChatEnrollmentProps) {
  const isAr = locale === "ar";
  const dialogRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, { active: open, onEscape: onClose });

  /* ── State ── */
  const [conv, setConv] = useState<ConversationState<EnrollmentChatForm>>(
    () => createInitialState<EnrollmentChatForm>()
  );
  const [isTyping, setIsTyping] = useState(false);
  const [mood, setMood] = useState<AstroMood>("idle");
  const [errorBubble, setErrorBubble] = useState<string | null>(null);
  const [registrationNumber, setRegistrationNumber] = useState<string | null>(null);
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);

  const steps = enrollmentSteps;
  const currentStep = steps[conv.currentStep] as
    | ConversationStep<EnrollmentChatForm>
    | undefined;
  const totalSteps = steps.length;
  const progress = Math.round(((conv.currentStep) / (totalSteps - 1)) * 100);

  /* ── Lock body scroll ── */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* ── Auto-scroll to bottom ── */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conv.messages, isTyping, errorBubble]);

  /* ── Show initial bot message on open ── */
  useEffect(() => {
    if (!open) return;
    // Reset state on each open
    const fresh = createInitialState<EnrollmentChatForm>();
    setConv(fresh);
    setRegistrationNumber(null);
    setErrorBubble(null);
    setMood("waving");

    // Simulate typing delay then show first message
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMood("idle");
      const firstStep = steps[0];
      setConv((prev) => ({
        ...prev,
        messages: addBotMessage(prev.messages, firstStep.botMessage({}, locale)),
        status: "waiting",
      }));
    }, 800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, locale]);

  /* ── Handle user answer ── */
  const handleAnswer = useCallback(
    (value: unknown) => {
      if (!currentStep || conv.status !== "waiting") return;

      // Validate
      const result = currentStep.validate(value, locale);
      if (!result.valid) {
        setErrorBubble(result.error ?? (isAr ? "حاول تاني" : "Try again"));
        setMood("error");
        setTimeout(() => {
          setMood("idle");
          setErrorBubble(null);
        }, 2500);
        return;
      }

      setErrorBubble(null);
      const displayText = formatAnswer(currentStep, value, locale);

      // Apply answer to form
      const newFormData = applyAnswer(conv.formData, currentStep, value);

      // Add user bubble
      let newMessages = addUserMessage(conv.messages, displayText);

      const nextIndex = conv.currentStep + 1;

      if (nextIndex >= totalSteps) {
        // All done (shouldn't happen — review is the last step)
        setConv((prev) => ({
          ...prev,
          currentStep: nextIndex,
          formData: newFormData,
          messages: newMessages,
          status: "reviewing",
        }));
        return;
      }

      // If we are in edit mode, jump back to review
      if (editingStepIndex !== null) {
        setEditingStepIndex(null);
        setConv((prev) => ({
          ...prev,
          currentStep: totalSteps - 1, // The review step
          formData: newFormData,
          messages: newMessages,
          status: "reviewing" as const,
        }));
        return;
      }

      // Show typing, then next bot message
      setMood("talking");
      setIsTyping(true);
      setConv((prev) => ({
        ...prev,
        currentStep: nextIndex,
        formData: newFormData,
        messages: newMessages,
        status: "typing" as const,
      }));

      setTimeout(() => {
        setIsTyping(false);
        const nextStep = steps[nextIndex];
        setConv((prev) => ({
          ...prev,
          messages: addBotMessage(
            prev.messages,
            nextStep.botMessage(newFormData, locale)
          ),
          status: nextStep.inputType === "review" ? "reviewing" : "waiting",
        }));
        setMood(nextStep.inputType === "review" ? "celebrating" : "listening");
      }, 600);
    },
    [conv, currentStep, locale, isAr, steps, totalSteps]
  );

  /* ── Go back one step ── */
  const handleBack = useCallback(() => {
    if (conv.currentStep <= 0) return;
    const prevIndex = conv.currentStep - 1;
    const prevStep = steps[prevIndex];

    // Remove last 2 messages (user answer + bot question for current step)
    const trimmedMessages = conv.messages.slice(0, -2);

    setConv((prev) => ({
      ...prev,
      currentStep: prevIndex,
      messages: trimmedMessages,
      status: "waiting",
    }));
    setMood("idle");
    setErrorBubble(null);
  }, [conv, steps]);

  /* ── Submit enrollment ── */
  const handleSubmit = useCallback(async () => {
    setConv((prev) => ({ ...prev, status: "submitting" }));
    setMood("thinking");

    // Compose address string (matching existing API contract)
    const form = conv.formData;
    const typeLabels: Record<string, Record<string, string>> = {
      en: { group: "Group", villa_group: "Villa Group" },
      ar: { group: "مجموعة", villa_group: "مجموعة فيلات" },
    };
    const typeLabel = typeLabels[locale]?.[form.addressType ?? ""] ?? form.addressType;
    const composedAddress = `${typeLabel}: ${form.addressArea}`;

    try {
      const res = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName: form.childName,
          childAge: form.childAge,
          childGender: form.childGender,
          childGrade: form.childGrade,
          schoolName: form.schoolName,
          parentName: form.parentName,
          parentNationalId: form.parentNationalId,
          phone: form.phone,
          email: form.email,
          madinatyAddress: composedAddress,
          addressType: form.addressType,
          addressArea: form.addressArea,
          interests: form.interests,
          hobbies: form.hobbies,
          locale,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        registrationNumber?: string;
        error?: string;
      };

      if (!res.ok) throw new Error(data.error ?? "Submission failed");

      setRegistrationNumber(data.registrationNumber ?? null);
      setMood("waving");

      const successMsg = isAr
        ? `🎉 تم التسجيل بنجاح! رقم المرجع: ${data.registrationNumber ?? ""}\nهنبعتلك التفاصيل على الإيميل. يلا يا ${form.childName}!`
        : `🎉 You're registered! Reference: ${data.registrationNumber ?? ""}\nWe'll email you the details. Let's go, ${form.childName}!`;

      setConv((prev) => ({
        ...prev,
        messages: addBotMessage(prev.messages, successMsg),
        status: "success",
        confirmationId: data.registrationNumber ?? null,
      }));
    } catch (err) {
      console.error("[AstroChatEnrollment] Submit error:", err);
      setMood("error");
      const errMsg = isAr
        ? "😟 حصل مشكلة في التسجيل. حاول تاني بعد شوية."
        : "😟 Something went wrong. Please try again in a moment.";
      setConv((prev) => ({
        ...prev,
        messages: addBotMessage(prev.messages, errMsg),
        status: "error",
        errorText: String(err),
      }));
    }
  }, [conv.formData, locale, isAr]);

  /* ── Edit from review ── */
  const handleEditFromReview = useCallback(
    (stepIndex: number) => {
      setEditingStepIndex(stepIndex);
      // We don't slice the messages anymore, we just append to the chat
      setConv((prev) => ({
        ...prev,
        currentStep: stepIndex,
        status: "waiting" as const,
      }));
      setMood("idle");

      // Inject the bot message for that step as a new message
      setTimeout(() => {
        const step = steps[stepIndex];
        setConv((prev) => ({
          ...prev,
          messages: addBotMessage(
            prev.messages,
            step.botMessage(prev.formData, locale)
          ),
        }));
      }, 100);
    },
    [steps, locale]
  );

  /* ── Close handler ── */
  const handleClose = useCallback(() => {
    setConv(createInitialState<EnrollmentChatForm>());
    setMood("idle");
    setIsTyping(false);
    setErrorBubble(null);
    setRegistrationNumber(null);
    setEditingStepIndex(null);
    onClose();
  }, [onClose]);

  /* ---- Render --------------------------------------------------- */

  if (!open) return null;

  const labels = {
    close: isAr ? "إغلاق" : "Close",
    back: isAr ? "رجوع" : "Back",
    skipToForm: isAr ? "تخطي إلى النموذج التقليدي" : "Skip to classic form",
    step: isAr ? "خطوة" : "Step",
    submit: isAr ? "أرسل التسجيل 🚀" : "Submit Registration 🚀",
    edit: isAr ? "تعديل" : "Edit",
    submitting: isAr ? "جاري الإرسال..." : "Submitting...",
    done: isAr ? "تم" : "Done",
  };

  return (
    <div
      className="astro-chat-backdrop"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="astro-chat-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={isAr ? "تسجيل الطفل مع أسترو" : "Enroll your child with Astro"}
        dir={isAr ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <header className="astro-chat-header">
          <div className="astro-chat-header-left">
            {conv.currentStep > 0 && conv.status !== "success" && (
              <button
                className="astro-chat-back-btn"
                onClick={handleBack}
                aria-label={labels.back}
              >
                {isAr ? "→" : "←"}
              </button>
            )}
            <span className="astro-chat-step-label">
              {labels.step} {Math.min(conv.currentStep + 1, totalSteps - 1)}/{totalSteps - 1}
            </span>
          </div>

          {/* Progress bar */}
          <div className="astro-chat-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="astro-chat-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <button
            className="astro-chat-close-btn"
            onClick={handleClose}
            aria-label={labels.close}
          >
            ✕
          </button>
        </header>

        {conv.status === "success" ? (
          <div className="astro-success-screen">
            <AstroAvatar mood="waving" className="astro-huge-avatar" />
            <div className="astro-success-details">
              <h3>{isAr ? "تم إرسال الطلب بنجاح!" : "Mission Accomplished!"}</h3>
              {registrationNumber && (
                <p className="astro-ref-no">
                  {isAr ? "رقم المرجع: " : "Reference Number: "}
                  <strong>{registrationNumber}</strong>
                </p>
              )}
              <button className="btn btn-primary" onClick={handleClose}>
                {labels.done}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ── Avatar area ── */}
            <div className="astro-chat-avatar-area">
              <AstroAvatar mood={mood} size="lg" />
            </div>

            {/* ── Chat thread ── */}
            <div className="astro-chat-thread" role="list" aria-live="polite">
              {conv.messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  sender={msg.sender}
                  avatar={
                    msg.sender === "bot" ? (
                      <span className="astro-mini-icon" aria-hidden="true">🐕</span>
                    ) : undefined
                  }
                >
                  {msg.text}
                </ChatBubble>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <ChatBubble
                  sender="bot"
                  isTyping
                  avatar={<span className="astro-mini-icon" aria-hidden="true">🐕</span>}
                />
              )}

              {/* Error bubble */}
              {errorBubble && (
                <ChatBubble sender="bot">
                  <span className="astro-error-text">⚠️ {errorBubble}</span>
                </ChatBubble>
              )}

              {/* Scroll anchor */}
              <div ref={chatEndRef} />
            </div>

            {/* ── Input area ── */}
            <div className="astro-chat-input-area">
              {conv.status === "waiting" && currentStep && (
                <ChatWidgetBubble>
                  {renderInputWidget(currentStep, handleAnswer, locale)}
                </ChatWidgetBubble>
              )}

              {/* Review card */}
              {conv.status === "reviewing" && (
                <div className="astro-review-card">
                  <h4 className="astro-review-title">
                    {isAr ? "📋 ملخص البيانات" : "📋 Mission Briefing"}
                  </h4>
                  <div className="astro-review-grid">
                    {steps.slice(0, -1).map((step, idx) => {
                      const fieldKey = Array.isArray(step.field) ? step.field[0] : step.field;
                      const val = Array.isArray(step.field)
                        ? Object.fromEntries(step.field.map((f) => [f, (conv.formData as Record<string, unknown>)[f]]))
                        : (conv.formData as Record<string, unknown>)[fieldKey];
                      return (
                        <div key={step.id} className="astro-review-row">
                          <span className="astro-review-label">
                            {step.id === "childName" ? (isAr ? "الاسم" : "Name")
                              : step.id === "childAge" ? (isAr ? "العمر" : "Age")
                              : step.id === "childGender" ? (isAr ? "النوع" : "Gender")
                              : step.id === "childGrade" ? (isAr ? "الصف" : "Grade")
                              : step.id === "schoolName" ? (isAr ? "المدرسة" : "School")
                              : step.id === "interests" ? (isAr ? "المواضيع" : "Topics")
                              : step.id === "hobbies" ? (isAr ? "الهوايات" : "Hobbies")
                              : step.id === "parentName" ? (isAr ? "ولي الأمر" : "Parent")
                              : step.id === "parentNationalId" ? (isAr ? "الرقم القومي" : "National ID")
                              : step.id === "phone" ? (isAr ? "الموبايل" : "Phone")
                              : step.id === "email" ? (isAr ? "الإيميل" : "Email")
                              : step.id === "address" ? (isAr ? "العنوان" : "Address")
                              : step.id}
                          </span>
                          <span className="astro-review-value">
                            {formatAnswer(step, val, locale)}
                          </span>
                          <button
                            className="astro-review-edit"
                            onClick={() => handleEditFromReview(idx)}
                            aria-label={`${labels.edit} ${step.id}`}
                          >
                            {labels.edit}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="btn btn-primary astro-submit-btn"
                    onClick={handleSubmit}
                    disabled={conv.status !== "reviewing"}
                  >
                    {labels.submit}
                  </button>
                </div>
              )}

              {/* Submitting state */}
              {conv.status === "submitting" && (
                <div className="astro-submitting">
                  <div className="astro-spinner" />
                  <span>{labels.submitting}</span>
                </div>
              )}
            </div>
          </>
        )}

          {/* Error retry */}
          {conv.status === "error" && (
            <div className="astro-error-area">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {isAr ? "حاول تاني" : "Try Again"}
              </button>
              <button className="btn btn-outline" onClick={handleClose}>
                {labels.close}
              </button>
            </div>
          )}
        </div>
      </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Input widget renderer                                              */
/* ------------------------------------------------------------------ */

function renderInputWidget(
  step: ConversationStep<EnrollmentChatForm>,
  onSubmit: (value: unknown) => void,
  locale: LocaleCode
) {
  const props = (step.inputProps ?? {}) as Record<string, unknown>;

  switch (step.inputType) {
    case "text":
      return (
        <TextInputWidget
          type="text"
          onSubmit={onSubmit}
          placeholder={
            props.placeholder as string | undefined ??
            (locale === "ar" ? "اكتب هنا..." : "Type here...")
          }
          locale={locale}
          inputProps={props}
        />
      );

    case "email":
      return (
        <TextInputWidget
          type="email"
          onSubmit={onSubmit}
          placeholder={locale === "ar" ? "example@email.com" : "example@email.com"}
          locale={locale}
          inputProps={props}
        />
      );

    case "tel":
      return (
        <TextInputWidget
          type="tel"
          onSubmit={onSubmit}
          placeholder={locale === "ar" ? "01xxxxxxxxx" : "01xxxxxxxxx"}
          locale={locale}
          inputProps={props}
        />
      );

    case "number":
      return (
        <NumberInputWidget
          onSubmit={onSubmit}
          locale={locale}
          min={(props.min as number) ?? 7}
          max={(props.max as number) ?? 10}
        />
      );

    case "select":
      return (
        <SelectWidget
          options={step.options?.(locale) ?? []}
          onSubmit={onSubmit}
          locale={locale}
        />
      );

    case "multi-select":
      return (
        <MultiSelectWidget
          options={step.options?.(locale) ?? []}
          onSubmit={onSubmit}
          locale={locale}
        />
      );

    case "cascading-select": {
      const cfg = step.cascadingConfig?.(locale);
      if (!cfg) return null;
      return (
        <CascadingSelectWidget
          config={cfg}
          onSubmit={onSubmit}
          locale={locale}
        />
      );
    }

    default:
      return null;
  }
}
