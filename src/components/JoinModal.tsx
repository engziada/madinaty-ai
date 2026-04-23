"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import type { LocaleCode } from "@/types/site";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface JoinFormState {
  name: string;
  email: string;
  phone: string;
  gender: string;
  group_no: string;
  building_no: string;
  apartment_no: string;
}

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

interface JoinModalProps {
  locale: LocaleCode;
  open: boolean;
  onClose: () => void;
}

type SubmissionState = "idle" | "submitting" | "success" | "error";

// Allow latin + arabic digits and common separators, 1-10 chars.
const ADDRESS_PART_RE = /^[\p{L}\p{N}\-/ ]{1,10}$/u;

export function JoinModal({ locale, open, onClose }: JoinModalProps) {
  const [form, setForm] = useState(initialFormState);
  const [state, setState] = useState<SubmissionState>("idle");
  const [statusText, setStatusText] = useState<string>("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, { active: open, onEscape: () => onClose() });

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const labels = useMemo(() => {
    if (locale === "ar") {
      return {
        title: "انضم إلى مبادرة مدينتي AI",
        description: "سجّل بياناتك وسيتواصل معك فريق مدينتي لتحديد كيفية مشاركتك.",
        nameLabel: "الاسم الكامل",
        emailLabel: "البريد الإلكتروني",
        phoneLabel: "رقم الهاتف",
        genderLabel: "النوع",
        addressLegend: "عنوان الوحدة بمدينتي",
        groupLabel: "رقم المجموعة",
        buildingLabel: "رقم العمارة",
        apartmentLabel: "رقم الشقة",
        submit: "إرسال",
        submitting: "جارٍ الإرسال...",
        close: "إغلاق",
        success: "تم التسجيل بنجاح! سنتواصل معك قريباً.",
        error: "حدث خطأ. حاول مرة أخرى.",
        validationError: "يرجى استكمال الحقول المطلوبة بشكل صحيح.",
        addressHintGroup: "مثال: 12",
        addressHintBuilding: "مثال: 7",
        addressHintApartment: "مثال: 25",
        required: "مطلوب",
      };
    }
    return {
      title: "Join the Madinaty AI Initiative",
      description: "Register your details and our Madinaty team will reach out about how you can participate.",
      nameLabel: "Full Name",
      emailLabel: "Email",
      phoneLabel: "Phone Number",
      genderLabel: "Gender",
      addressLegend: "Your Madinaty Unit Address",
      groupLabel: "Group No.",
      buildingLabel: "Building No.",
      apartmentLabel: "Apartment No.",
      submit: "Submit",
      submitting: "Sending...",
      close: "Close",
      success: "Registration successful! We'll contact you soon.",
      error: "Something went wrong. Please try again.",
      validationError: "Please complete all required fields correctly.",
      addressHintGroup: "E.g. 12",
      addressHintBuilding: "E.g. 7",
      addressHintApartment: "E.g. 25",
      required: "required",
    };
  }, [locale]);

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

  const handleChange = (field: keyof JoinFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || state === "submitting") {
      setStatusText(labels.validationError);
      setState("error");
      return;
    }

    setState("submitting");
    setStatusText("");

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
          // Preserve role for backend compatibility; default to "Resident".
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
      setForm(initialFormState);
    } catch (error) {
      console.error("[JoinModal] Submit error:", error);
      setState("error");
      setStatusText(labels.error);
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
    <div className="modal-overlay" onClick={handleClose} role="presentation">
      <div
        className="modal-content join-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose} aria-label={labels.close}>
          <X size={20} />
        </button>

        <div className="join-modal-header">
          <h3 id="join-title">{labels.title}</h3>
          <p>{labels.description}</p>
        </div>

        <form className="join-form" onSubmit={handleSubmit} noValidate>
          <label className="join-field">
            <span>
              {labels.nameLabel} <Required />
            </span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              autoComplete="name"
              required
            />
          </label>

          <label className="join-field">
            <span>
              {labels.emailLabel} <Required />
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="join-field">
            <span>
              {labels.phoneLabel} <Required />
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              autoComplete="tel"
              required
            />
          </label>

          <label className="join-field">
            <span>
              {labels.genderLabel} <Required />
            </span>
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
                <span>{labels.groupLabel}</span>
                <input
                  type="text"
                  value={form.group_no}
                  onChange={(e) => handleChange("group_no", e.target.value)}
                  placeholder={labels.addressHintGroup}
                  maxLength={10}
                  required
                  inputMode="text"
                />
              </label>
              <label className="join-field">
                <span>{labels.buildingLabel}</span>
                <input
                  type="text"
                  value={form.building_no}
                  onChange={(e) => handleChange("building_no", e.target.value)}
                  placeholder={labels.addressHintBuilding}
                  maxLength={10}
                  required
                  inputMode="text"
                />
              </label>
              <label className="join-field">
                <span>{labels.apartmentLabel}</span>
                <input
                  type="text"
                  value={form.apartment_no}
                  onChange={(e) => handleChange("apartment_no", e.target.value)}
                  placeholder={labels.addressHintApartment}
                  maxLength={10}
                  required
                  inputMode="text"
                />
              </label>
            </div>
          </fieldset>

          <div className="join-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || state === "submitting"}
            >
              {state === "submitting" ? labels.submitting : labels.submit}
            </button>
            <button type="button" className="btn btn-outline" onClick={handleClose}>
              {labels.close}
            </button>
          </div>

          {statusText && (
            <p
              className={`form-status ${state === "success" ? "success" : "error"}`}
              aria-live="polite"
            >
              {statusText}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
