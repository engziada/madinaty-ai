"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { LocaleCode } from "@/types/site";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import {
  type JoinFormState,
  type CopilotMessage,
  extractFields,
  getNextPrompt,
} from "./CopilotEngine";
import { ChatBubble } from "./ChatBubble";
import { AstroAvatar, type AstroMood } from "@/components/AstroAvatar/index";

const initialFormState: JoinFormState = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  group_no: "",
  building_no: "",
  apartment_no: "",
};

function getGenderOptions(locale: LocaleCode) {
  if (locale === "ar") {
    return [
      { value: "", label: "اختر النوع" },
      { value: "Male", label: "ذكر" },
      { value: "Female", label: "أنثى" },
      { value: "Prefer not to say", label: "أفضّل عدم القول" },
    ];
  }
  return [
    { value: "", label: "Select gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];
}

interface CopilotJoinFormProps {
  locale: LocaleCode;
  open: boolean;
  onClose: () => void;
}

type SubmissionState = "idle" | "submitting" | "success" | "error";

const ADDRESS_PART_RE = /^[\p{L}\p{N}\-/ ]{1,10}$/u;

export function CopilotJoinForm({ locale, open, onClose }: CopilotJoinFormProps) {
  const isAr = locale === "ar";
  const [form, setForm] = useState<JoinFormState>(initialFormState);
  const [state, setState] = useState<SubmissionState>("idle");
  const [statusText, setStatusText] = useState<string>("");
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // Chat state
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<AstroMood>("idle");

  useFocusTrap(dialogRef, { active: open, onEscape: onClose });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    
    // Reset state on open
    setForm(initialFormState);
    setState("idle");
    setStatusText("");
    setMood("idle");
    
    const welcomeText = isAr
      ? "أهلاً بك! أنا المساعد الذكي. تقدر تملأ النموذج بنفسك، أو تكتبلي بياناتك هنا (زي اسمك، ورقم موبايلك) وأنا هساعدك في تعبئتها. اسمك إيه؟"
      : "Hi! I'm your AI Copilot. You can fill the form yourself, or just chat with me here (e.g., 'My name is John, phone is 010...') and I'll fill it for you. What's your name?";

    setMessages([{ id: "msg-0", sender: "bot", text: welcomeText }]);

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isAr]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const labels = useMemo(() => {
    if (isAr) {
      return {
        title: "انضم إلى مدينتي AI",
        description: "أهلاً بك! تقدر تعبي البيانات بنفسك أو تتكلم معايا وأنا هعبيها عنك.",
        nameLabel: "الاسم الكامل",
        emailLabel: "البريد الإلكتروني",
        phoneLabel: "رقم الهاتف",
        genderLabel: "النوع",
        addressLegend: "عنوان الوحدة بمدينتي",
        groupLabel: "المجموعة",
        buildingLabel: "العمارة",
        apartmentLabel: "الشقة",
        submit: "إرسال",
        submitting: "جارٍ الإرسال...",
        close: "إغلاق",
        success: "تم التسجيل بنجاح! سنتواصل معك قريباً.",
        error: "حدث خطأ. حاول مرة أخرى.",
        validationError: "يرجى استكمال الحقول المطلوبة بشكل صحيح.",
        required: "مطلوب",
        chatPlaceholder: "اكتب هنا (مثال: أنا اسمي كذا ورقمي كذا)...",
      };
    }
    return {
      title: "Join Madinaty AI",
      description: "Welcome! Fill the form yourself or chat with me and I'll auto-fill it.",
      nameLabel: "Full Name",
      emailLabel: "Email",
      phoneLabel: "Phone Number",
      genderLabel: "Gender",
      addressLegend: "Madinaty Address",
      groupLabel: "Group",
      buildingLabel: "Building",
      apartmentLabel: "Apt",
      submit: "Submit",
      submitting: "Sending...",
      close: "Close",
      success: "Registration successful! We'll contact you soon.",
      error: "Something went wrong. Please try again.",
      validationError: "Please complete all required fields correctly.",
      required: "required",
      chatPlaceholder: "Type here (e.g. My name is John and phone is...)",
    };
  }, [isAr]);

  const isValid = useMemo(() => {
    return (
      form.name.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      /^\+?[\d\s-]{7,15}$/.test(form.phone) &&
      form.gender !== "" &&
      ADDRESS_PART_RE.test(form.group_no.trim()) &&
      ADDRESS_PART_RE.test(form.building_no.trim()) &&
      ADDRESS_PART_RE.test(form.apartment_no.trim())
    );
  }, [form]);

  // Handle direct form edits
  const handleChange = useCallback((field: keyof JoinFormState, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Optional: Check if we just completed everything
      return next;
    });
  }, []);

  // Handle chat submission
  const handleChatSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatInput("");
    
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: userText }
    ]);

    // Parse input
    const { newState, extracted } = extractFields(userText, form);
    
    setForm(newState);
    setMood("thinking");

    // Formulate bot response
    setTimeout(() => {
      let botResponse = "";
      if (extracted.length > 0) {
        // Acknowledge fields
        const fieldNames = extracted.map(k => {
          if (k === "name") return isAr ? "الاسم" : "Name";
          if (k === "email") return isAr ? "الإيميل" : "Email";
          if (k === "phone") return isAr ? "رقم الهاتف" : "Phone";
          if (k === "gender") return isAr ? "النوع" : "Gender";
          if (k === "group_no") return isAr ? "المجموعة" : "Group";
          if (k === "building_no") return isAr ? "العمارة" : "Building";
          if (k === "apartment_no") return isAr ? "الشقة" : "Apartment";
          return k;
        });
        botResponse += isAr 
          ? `ممتاز، سجلت: ${fieldNames.join("، ")}. ` 
          : `Got it, I updated: ${fieldNames.join(", ")}. `;
      } else {
        botResponse += isAr 
          ? "امم، مش متأكد إني فهمت معلومة جديدة من دي. " 
          : "Hmm, I didn't catch any new info from that. ";
      }

      const nextPrompt = getNextPrompt(newState, locale);
      if (nextPrompt) {
        botResponse += nextPrompt;
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "-bot", sender: "bot", text: botResponse }
      ]);
      setMood("talking");
      setTimeout(() => setMood("idle"), 1500);
    }, 500);

  }, [chatInput, form, isAr, locale]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || state === "submitting") {
      setStatusText(labels.validationError);
      setState("error");
      setMood("error");
      setTimeout(() => setMood("idle"), 2500);
      
      const nextPrompt = getNextPrompt(form, locale);
      const errMsg = isAr 
        ? `في بيانات ناقصة، من فضلك راجع النموذج. ${nextPrompt || ""}` 
        : `Some required fields are missing. ${nextPrompt || ""}`;
      
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "-err", sender: "bot", text: errMsg }
      ]);
      return;
    }

    setState("submitting");
    setStatusText("");
    setMood("thinking");

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          gender: form.gender,
          group_no: form.group_no.trim(),
          building_no: form.building_no.trim(),
          apartment_no: form.apartment_no.trim(),
          role: "Resident",
          locale,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setState("success");
      setStatusText(labels.success);
      setMood("waving");
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + "-success", sender: "bot", text: labels.success }
      ]);
      
      // Delay closing slightly so user sees success message
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (error) {
      console.error("[CopilotJoinForm] Submit error:", error);
      setState("error");
      setStatusText(labels.error);
      setMood("error");
    }
  };

  const handleClose = () => {
    setState("idle");
    setStatusText("");
    onClose();
  };

  if (!open) return null;

  const Required = () => (
    <abbr title={labels.required} aria-label={labels.required} className="req-mark">
      *
    </abbr>
  );

  return (
    <div className="copilot-backdrop" onClick={handleClose} role="presentation" dir={isAr ? "rtl" : "ltr"}>
      <div
        className="copilot-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="copilot-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="copilot-close" onClick={handleClose} aria-label={labels.close}>✕</button>

        <div className="copilot-header">
          <h3 id="copilot-title">{labels.title}</h3>
          <p>{labels.description}</p>
        </div>

        <div className="copilot-layout">
          {/* Left Side: Standard Form */}
          <div className="copilot-form-pane">
            <form className="join-form copilot-join-form" onSubmit={handleSubmit} noValidate>
              <label className="join-field">
                <span>{labels.nameLabel} <Required /></span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  autoComplete="name"
                  required
                />
              </label>

              <label className="join-field">
                <span>{labels.emailLabel} <Required /></span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  autoComplete="email"
                  required
                />
              </label>

              <label className="join-field">
                <span>{labels.phoneLabel} <Required /></span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  autoComplete="tel"
                  required
                />
              </label>

              <label className="join-field">
                <span>{labels.genderLabel} <Required /></span>
                <select
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  required
                >
                  {getGenderOptions(locale).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="join-fieldset">
                <legend>
                  {labels.addressLegend} <Required />
                </legend>
                <div className="join-address-row">
                  <label className="join-field">
                    <span className="sr-only">{labels.groupLabel}</span>
                    <input
                      type="text"
                      placeholder={labels.groupLabel}
                      value={form.group_no}
                      onChange={(e) => handleChange("group_no", e.target.value)}
                      required
                    />
                  </label>
                  <label className="join-field">
                    <span className="sr-only">{labels.buildingLabel}</span>
                    <input
                      type="text"
                      placeholder={labels.buildingLabel}
                      value={form.building_no}
                      onChange={(e) => handleChange("building_no", e.target.value)}
                      required
                    />
                  </label>
                  <label className="join-field">
                    <span className="sr-only">{labels.apartmentLabel}</span>
                    <input
                      type="text"
                      placeholder={labels.apartmentLabel}
                      value={form.apartment_no}
                      onChange={(e) => handleChange("apartment_no", e.target.value)}
                      required
                    />
                  </label>
                </div>
              </fieldset>

              {statusText && (
                <div className={`form-status ${state === "error" ? "status-error" : "status-success"}`}>
                  {statusText}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={state === "submitting" || state === "success"}
              >
                {state === "submitting" ? labels.submitting : labels.submit}
              </button>
            </form>
          </div>

          {/* Right Side: Copilot Chat */}
          <div className="copilot-chat-pane">
            <div className="copilot-chat-avatar-area">
              <AstroAvatar mood={mood} size="sm" />
            </div>
            <div className="copilot-chat-thread">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} sender={msg.sender}>
                  {msg.text}
                </ChatBubble>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form className="copilot-chat-input" onSubmit={handleChatSubmit}>
              <input
                type="text"
                placeholder={labels.chatPlaceholder}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                dir="auto"
              />
              <button type="submit" disabled={!chatInput.trim()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
