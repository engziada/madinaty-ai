"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { LocaleCode } from "@/types/site";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const initialFormState = {
  childName: "",
  childAge: "",
  parentName: "",
  phone: "",
  email: "",
  district: "",
  referral: ""
};

const referralOptions = [
  "Community newsletter",
  "School / Parent group",
  "Social media",
  "Referral from a neighbor",
  "Other"
];

const districtOptions = [
  { value: "B5", label: "Innovation Hub · District B5" },
  { value: "Gateway", label: "North Gate Plaza & welcome center" },
  { value: "C1", label: "District C1 · Green Spine" },
  { value: "D", label: "District D · Solar Campus" },
  { value: "E", label: "District E · Health & Wellness" },
  { value: "F", label: "District F · Community Park" }
];

interface EnrollmentModalProps {
  locale: LocaleCode;
  open: boolean;
  onClose: () => void;
}

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function EnrollmentModal({ locale, open, onClose }: EnrollmentModalProps) {
  const [form, setForm] = useState(initialFormState);
  const [state, setState] = useState<SubmissionState>("idle");
  const [statusText, setStatusText] = useState<string>("");
  const endpoint = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus + Escape-to-close while the modal is open.
  useFocusTrap(dialogRef, { active: open, onEscape: () => onClose() });

  // Lock body scroll while the dialog is open so the backdrop cannot be scrolled behind.
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
        title: "سجل طفلك في الدورة المجانية",
        description: "املأ النموذج وسندخل البيانات مباشرة إلى جدول Google Sheets ليتواصل معنا فريق مدينتي.",
        submit: "أرسل التسجيل",
        success: "تم تسجيل طفلك! سنؤكد عبر الهاتف قريباً.",
        missingEndpoint: "لم يتم إعداد نقطة نهاية Google Sheets بعد. قم بإعدادها حسب الوثائق.",
        close: "إغلاق",
        header: "بيانات التسجيل"
      };
    }

    return {
      title: "Register your child for the free course",
      description: "Supply the details and we will write them directly to the Madinaty enrollment sheet.",
      submit: "Submit registration",
      success: "Thanks! We logged your request and will confirm via SMS shortly.",
      missingEndpoint: "Missing Google Sheets endpoint. Set NEXT_PUBLIC_SHEETS_ENDPOINT as explained in the docs.",
      close: "Close",
      header: "Enrollment Details"
    };
  }, [locale]);

  const isValid = useMemo(() => {
    return (
      form.childName.trim().length > 1 &&
      Number(form.childAge) >= 8 &&
      Number(form.childAge) <= 14 &&
      form.parentName.trim().length > 1 &&
      /^\+?[0-9\s-]{7,15}$/.test(form.phone) &&
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) &&
      form.district &&
      form.referral &&
      Boolean(endpoint)
    );
  }, [form, endpoint]);

  const handleChange = (field: keyof typeof initialFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || state === "submitting" || !endpoint) {
      setStatusText(endpoint ? "Please complete all fields." : labels.missingEndpoint);
      setState("error");
      return;
    }

    setState("submitting");
    setStatusText(locale === "ar" ? "جارٍ إرسال البيانات..." : "Submitting your enrollment...");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName: form.childName,
          childAge: form.childAge,
          parentName: form.parentName,
          phone: form.phone,
          email: form.email,
          district: form.district,
          referral: form.referral
        })
      });

      if (!response.ok) {
        throw new Error("Failed to save registration");
      }

      setState("success");
      setStatusText(labels.success);
      setForm(initialFormState);
    } catch (error) {
      setState("error");
      setStatusText(
        locale === "ar"
          ? "حدث خطأ أثناء إرسال بيانات التسجيل. حاول مرة أخرى لاحقاً."
          : "Unable to submit right now. Please try again in a moment."
      );
    }
  };

  const handleClose = () => {
    setState("idle");
    setStatusText("");
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="enrollment-modal-backdrop"
      onClick={handleClose}
      onKeyDown={(event) => event.key === "Escape" && handleClose()}
      role="presentation"
    >
      <div
        className="enrollment-modal glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enrollment-title"
        aria-describedby="enrollment-description"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="enrollment-header">
          <div>
            <p className="overline">{labels.header}</p>
            <h3 id="enrollment-title">{labels.title}</h3>
            <p id="enrollment-description">{labels.description}</p>
          </div>
          <button className="modal-close" type="button" onClick={handleClose} aria-label={labels.close}>
            ×
          </button>
        </header>

        <form className="enrollment-form" onSubmit={handleSubmit}>
          <div className="enrollment-row">
            <label className="enrollment-field">
              Child's full name
              <input
                type="text"
                value={form.childName}
                onChange={(event) => handleChange("childName", event.target.value)}
                placeholder="E.g. Karim Hassan"
                required
              />
            </label>
            <label className="enrollment-field">
              Child's age (8-14)
              <input
                type="number"
                min={8}
                max={14}
                value={form.childAge}
                onChange={(event) => handleChange("childAge", event.target.value)}
                required
              />
            </label>
          </div>

          <label className="enrollment-field">
            Parent / Guardian full name
            <input
              type="text"
              value={form.parentName}
              onChange={(event) => handleChange("parentName", event.target.value)}
              required
            />
          </label>

          <div className="enrollment-row">
            <label className="enrollment-field">
              Phone number
              <input
                type="tel"
                pattern="^\+?[0-9\s-]{7,15}$"
                value={form.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                required
              />
            </label>
            <label className="enrollment-field">
              Parent email
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                required
              />
            </label>
          </div>

          <label className="enrollment-field">
            Madinaty sub-compound / district
            <select
              value={form.district}
              onChange={(event) => handleChange("district", event.target.value)}
              required
            >
              <option value="">Select a district</option>
              {districtOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="enrollment-field">
            How did you hear about us?
            <select
              value={form.referral}
              onChange={(event) => handleChange("referral", event.target.value)}
              required
            >
              <option value="">Choose an option</option>
              {referralOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="enrollment-actions">
            <button type="submit" className="btn btn-primary" disabled={!isValid || state === "submitting"}>
              {state === "submitting" ? (locale === "ar" ? "جارٍ الإرسال..." : "Sending...") : labels.submit}
            </button>
            <button type="button" className="btn btn-outline" onClick={handleClose}>
              {labels.close}
            </button>
          </div>

          {statusText ? (
            <p className={`form-status ${state === "success" ? "success" : "error"}`} aria-live="polite">
              {statusText}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
