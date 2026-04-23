"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { LocaleCode } from "@/types/site";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface EnrollmentFormState {
  childName: string;
  childAge: string;
  childGender: string;
  childGrade: string;
  schoolName: string;
  parentName: string;
  parentNationalId: string;
  phone: string;
  email: string;
  madinatyAddress: string;
  interests: string[];
  hobbies: string;
}

const initialFormState: EnrollmentFormState = {
  childName: "",
  childAge: "",
  childGender: "",
  childGrade: "",
  schoolName: "",
  parentName: "",
  parentNationalId: "",
  phone: "",
  email: "",
  madinatyAddress: "",
  interests: [],
  hobbies: ""
};

function getInterestOptions(locale: LocaleCode): Array<{ value: string; label: string }> {
  if (locale === "ar") {
    return [
      { value: "safe-prompting", label: "الكتابة الآمنة للأوامر" },
      { value: "fact-checking", label: "التحقق من المعلومات" },
      { value: "homework-support", label: "دعم الواجبات بطريقة صحيحة" },
      { value: "creative-learning", label: "التعلم الإبداعي" },
      { value: "digital-safety", label: "الأمان الرقمي للأطفال" }
    ];
  }

  return [
    { value: "safe-prompting", label: "Safe prompting basics" },
    { value: "fact-checking", label: "Fact-checking AI answers" },
    { value: "homework-support", label: "Homework support the right way" },
    { value: "creative-learning", label: "Creative learning with AI" },
    { value: "digital-safety", label: "Digital safety for kids" }
  ];
}

function getDistrictOptions(locale: LocaleCode): Array<{ value: string; label: string }> {
  if (locale === "ar") {
    return [
      { value: "B5", label: "مركز الابتكار · الحي B5" },
      { value: "Gateway", label: "ساحة البوابة الشمالية ومركز الاستقبال" },
      { value: "C1", label: "الحي C1 · المحور الأخضر" },
      { value: "D", label: "الحي D · الحرم الشمسي" },
      { value: "E", label: "الحي E · الصحة والعافية" },
      { value: "F", label: "الحي F · منتزه المجتمع" }
    ];
  }

  return [
    { value: "B5", label: "Innovation Hub · District B5" },
    { value: "Gateway", label: "North Gate Plaza & welcome center" },
    { value: "C1", label: "District C1 · Green Spine" },
    { value: "D", label: "District D · Solar Campus" },
    { value: "E", label: "District E · Health & Wellness" },
    { value: "F", label: "District F · Community Park" }
  ];
}

function getGenderOptions(locale: LocaleCode): Array<{ value: string; label: string }> {
  if (locale === "ar") {
    return [
      { value: "boy", label: "ولد" },
      { value: "girl", label: "بنت" }
    ];
  }

  return [
    { value: "boy", label: "Boy" },
    { value: "girl", label: "Girl" }
  ];
}

function getGradeOptions(locale: LocaleCode): Array<{ value: string; label: string }> {
  if (locale === "ar") {
    return [
      { value: "grade-1", label: "الصف الأول" },
      { value: "grade-2", label: "الصف الثاني" },
      { value: "grade-3", label: "الصف الثالث" },
      { value: "grade-4", label: "الصف الرابع" },
      { value: "grade-5", label: "الصف الخامس" }
    ];
  }

  return [
    { value: "grade-1", label: "Grade 1" },
    { value: "grade-2", label: "Grade 2" },
    { value: "grade-3", label: "Grade 3" },
    { value: "grade-4", label: "Grade 4" },
    { value: "grade-5", label: "Grade 5" }
  ];
}

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
  const [registrationNumber, setRegistrationNumber] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const successDialogRef = useRef<HTMLDivElement>(null);

  // Trap focus + Escape-to-close while the modal is open.
  useFocusTrap(dialogRef, { active: open, onEscape: () => onClose() });

  // Trap focus for success modal
  useFocusTrap(successDialogRef, {
    active: showSuccessModal,
    onEscape: () => setShowSuccessModal(false)
  });

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
        description: "املأ البيانات المطلوبة وسيتواصل معك فريق مدينتي بعد مراجعة الطلب.",
        submit: "أرسل التسجيل",
        success: "تم تسجيلك في قائمة الانتظار! سنرسل لك تاريخ الجلسة بمجرد تحديده.",
        validationError: "يرجى استكمال جميع الحقول المطلوبة بشكل صحيح.",
        submitting: "جارٍ إرسال البيانات...",
        close: "إغلاق",
        header: "بيانات التسجيل",
        childSection: "بيانات الطفل",
        guardianSection: "بيانات ولي الأمر",
        childNameLabel: "الاسم الكامل للطفل",
        childNamePlaceholder: "مثال: كريم حسن",
        childAgeLabel: "العمر (٧–١٠)",
        childGenderLabel: "النوع",
        childGenderPlaceholder: "اختر النوع",
        childGradeLabel: "الصف الدراسي",
        childGradePlaceholder: "اختر الصف",
        schoolNameLabel: "اسم المدرسة",
        schoolNamePlaceholder: "اكتب اسم المدرسة",
        parentNameLabel: "الاسم الكامل لولي الأمر",
        parentNationalIdLabel: "الرقم القومي لولي الأمر",
        parentNationalIdPlaceholder: "١٤ رقماً",
        phoneLabel: "رقم الهاتف",
        emailLabel: "بريد ولي الأمر الإلكتروني",
        madinatyAddressLabel: "العنوان داخل مدينتي (رقم القطعة - العمارة - الشقة)",
        madinatyAddressPlaceholder: "مثال: B10 - عمارة 4 - شقة 12",
        interestsLabel: "مهتم بـ (يمكن اختيار أكثر من خيار)",
        interestsHint: "اختر موضوعاً واحداً على الأقل",
        hobbiesLabel: "الهوايات",
        hobbiesPlaceholder: "مثال: الرسم، كرة القدم، البرمجة"
      };
    }

    return {
      title: "Register your child for the free course",
      description: "Complete the required details and our Madinaty team will contact you after review.",
      submit: "Submit registration",
      success: "You're on the waitlist! We'll email you the session date as soon as it's set.",
      validationError: "Please complete all required fields correctly.",
      submitting: "Submitting your enrollment...",
      close: "Close",
      header: "Enrollment Details",
      childSection: "Child Details",
      guardianSection: "Parent / Guardian Details",
      childNameLabel: "Child's full name",
      childNamePlaceholder: "E.g. Karim Hassan",
      childAgeLabel: "Age (7-10)",
      childGenderLabel: "Gender",
      childGenderPlaceholder: "Select gender",
      childGradeLabel: "Grade",
      childGradePlaceholder: "Select grade",
      schoolNameLabel: "School name",
      schoolNamePlaceholder: "Enter school name",
      parentNameLabel: "Parent / Guardian full name",
      parentNationalIdLabel: "Parent / Guardian national ID",
      parentNationalIdPlaceholder: "14-digit national ID",
      phoneLabel: "Phone number",
      emailLabel: "Parent email",
      madinatyAddressLabel: "Address in Madinaty (Plot-Building-Apt)",
      madinatyAddressPlaceholder: "E.g. B10 - Building 4 - Apt 12",
      interestsLabel: "Interested in (multiple choices)",
      interestsHint: "Select at least one topic",
      hobbiesLabel: "Hobbies",
      hobbiesPlaceholder: "E.g. drawing, football, coding"
    };
  }, [locale]);

  const genderOptions = useMemo(() => getGenderOptions(locale), [locale]);
  const gradeOptions = useMemo(() => getGradeOptions(locale), [locale]);
  const interestOptions = useMemo(() => getInterestOptions(locale), [locale]);

  const isValid = useMemo(() => {
    return (
      form.childName.trim().length > 1 &&
      Number(form.childAge) >= 7 &&
      Number(form.childAge) <= 10 &&
      Boolean(form.childGender) &&
      Boolean(form.childGrade) &&
      form.schoolName.trim().length > 1 &&
      form.parentName.trim().length > 1 &&
      /^\d{14}$/.test(form.parentNationalId) &&
      /^\+?[0-9\s-]{7,15}$/.test(form.phone) &&
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) &&
      form.madinatyAddress.trim().length > 2 &&
      form.interests.length > 0 &&
      form.hobbies.trim().length > 1
    );
  }, [form]);

  // Debug: Log detailed validation status
  useEffect(() => {
    const checks = {
      childName: form.childName.trim().length > 1,
      childAge: Number(form.childAge) >= 7 && Number(form.childAge) <= 10,
      childGender: Boolean(form.childGender),
      childGrade: Boolean(form.childGrade),
      schoolName: form.schoolName.trim().length > 1,
      parentName: form.parentName.trim().length > 1,
      parentNationalId: /^\d{14}$/.test(form.parentNationalId),
      phone: /^\+?[0-9\s-]{7,15}$/.test(form.phone),
      email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email),
      madinatyAddress: form.madinatyAddress.trim().length > 2,
      interests: form.interests.length > 0,
      hobbies: form.hobbies.trim().length > 1
    };
    const failed = Object.entries(checks).filter(([_, v]) => !v).map(([k]) => k);
    console.log("[EnrollmentModal] isValid:", isValid, "failed checks:", failed);
  }, [isValid, form, state]);

  const handleChange = (field: keyof EnrollmentFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleInterest = (interest: string) => {
    setForm((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((item) => item !== interest) : [...prev.interests, interest]
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || state === "submitting") {
      setStatusText(labels.validationError);
      setState("error");
      return;
    }

    setState("submitting");
    setStatusText(labels.submitting);

    try {
      const response = await fetch("/api/enrollment", {
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
          madinatyAddress: form.madinatyAddress,
          interests: form.interests,
          hobbies: form.hobbies,
          locale
        })
      });

      const responseData = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        registrationNumber?: string;
      };

      if (!response.ok) {
        console.error("[EnrollmentModal] Server error:", responseData);
        throw new Error(responseData.error ?? "Failed to save registration");
      }

      setState("success");
      setStatusText(labels.success);
      setForm(initialFormState);

      // Close form and show success modal with registration number
      if (responseData.registrationNumber) {
        setRegistrationNumber(responseData.registrationNumber);
        setShowSuccessModal(true);
        onClose(); // Close the enrollment form modal
      }
    } catch (error) {
      console.error("[EnrollmentModal] Submit error:", error);
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

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setRegistrationNumber(null);
  };

  if (!open && !showSuccessModal) {
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

        <div className="enrollment-modal-content">
        <form className="enrollment-form" onSubmit={handleSubmit}>
          <p className="enrollment-section-title">{labels.childSection}</p>

          <div className="enrollment-row">
            <label className="enrollment-field">
              <span className="required-field">{labels.childNameLabel}</span>
              <input
                type="text"
                value={form.childName}
                onChange={(event) => handleChange("childName", event.target.value)}
                placeholder={labels.childNamePlaceholder}
                required
              />
            </label>

            <label className="enrollment-field">
              <span className="required-field">{labels.childAgeLabel}</span>
              <input
                type="number"
                min={7}
                max={10}
                value={form.childAge}
                onChange={(event) => handleChange("childAge", event.target.value)}
                required
              />
            </label>
          </div>

          <div className="enrollment-row">
            <label className="enrollment-field">
              <span className="required-field">{labels.childGenderLabel}</span>
              <select
                value={form.childGender}
                onChange={(event) => handleChange("childGender", event.target.value)}
                required
              >
                <option value="">{labels.childGenderPlaceholder}</option>
                {genderOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="enrollment-field">
              <span className="required-field">{labels.childGradeLabel}</span>
              <select
                value={form.childGrade}
                onChange={(event) => handleChange("childGrade", event.target.value)}
                required
              >
                <option value="">{labels.childGradePlaceholder}</option>
                {gradeOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="enrollment-field">
            <span className="required-field">{labels.schoolNameLabel}</span>
            <input
              type="text"
              value={form.schoolName}
              onChange={(event) => handleChange("schoolName", event.target.value)}
              placeholder={labels.schoolNamePlaceholder}
              required
            />
          </label>

          <div className="enrollment-field">
            {labels.interestsLabel}
            <div className="enrollment-checkbox-grid" role="group" aria-label={labels.interestsLabel}>
              {interestOptions.map((item) => (
                <label key={item.value} className="enrollment-checkbox-item">
                  <input
                    type="checkbox"
                    checked={form.interests.includes(item.value)}
                    onChange={() => handleToggleInterest(item.value)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
            <small className="enrollment-hint">{labels.interestsHint}</small>
          </div>

          <label className="enrollment-field">
            {labels.hobbiesLabel}
            <input
              type="text"
              value={form.hobbies}
              onChange={(event) => handleChange("hobbies", event.target.value)}
              placeholder={labels.hobbiesPlaceholder}
              required
            />
          </label>

          <p className="enrollment-section-title">{labels.guardianSection}</p>

          <label className="enrollment-field">
            <span className="required-field">{labels.parentNameLabel}</span>
            <input
              type="text"
              value={form.parentName}
              onChange={(event) => handleChange("parentName", event.target.value)}
              required
            />
          </label>

          <div className="enrollment-row">
            <label className="enrollment-field">
              <span className="required-field">{labels.parentNationalIdLabel}</span>
              <input
                type="text"
                inputMode="numeric"
                value={form.parentNationalId}
                onChange={(event) => handleChange("parentNationalId", event.target.value.replace(/\D/g, "").slice(0, 14))}
                placeholder={labels.parentNationalIdPlaceholder}
                required
              />
            </label>

            <label className="enrollment-field">
              <span className="required-field">{labels.phoneLabel}</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                required
              />
            </label>
          </div>

          <label className="enrollment-field">
            <span className="required-field">{labels.emailLabel}</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              required
            />
          </label>

          <label className="enrollment-field">
            <span className="required-field">{labels.madinatyAddressLabel}</span>
            <input
              type="text"
              value={form.madinatyAddress}
              onChange={(event) => handleChange("madinatyAddress", event.target.value)}
              placeholder={labels.madinatyAddressPlaceholder}
              required
            />
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="enrollment-modal-backdrop"
          onClick={handleCloseSuccess}
          role="presentation"
        >
          <div
            className="enrollment-modal success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            tabIndex={-1}
            ref={successDialogRef}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="enrollment-header success-header">
              <div className="success-icon">🎉</div>
              <h3 id="success-title">
                {locale === "ar" ? "أنت على قائمة الانتظار!" : "You're on the Waitlist!"}
              </h3>
              <button
                className="modal-close"
                type="button"
                onClick={handleCloseSuccess}
                aria-label={labels.close}
              >
                ×
              </button>
            </header>

            <div className="enrollment-modal-content">
              <div className="success-content">
                <p className="success-message">
                  {locale === "ar"
                    ? `أهلاً ${form.childName || ""}، تم حجز مكان طفلك في قائمة انتظار نادي مدينتي للذكاء الاصطناعي.`
                    : `Hi ${form.childName || ""}, your child's spot has been reserved on the Madinaty AI Club waitlist.`}
                </p>

                <div className="registration-number-box">
                  <p className="reg-label">
                    {locale === "ar" ? "رقم المرجع الخاص بك:" : "Your Waitlist Reference:"}
                  </p>
                  <p className="reg-number">{registrationNumber}</p>
                  <p className="reg-hint">
                    {locale === "ar"
                      ? "احتفظ بهذا الرقم - ستحتاجه للاستفسارات المستقبلية"
                      : "Save this number - you'll need it for future inquiries"}
                  </p>
                </div>

                <p className="success-followup">
                  {locale === "ar"
                    ? "الجلسة لم يتم تحديد تاريخها بعد. سنرسل لك التاريخ والمكان بمجرد تحديدهما عبر الهاتف أو البريد الإلكتروني. شكراً لانضمامك!"
                    : "The session date is not yet set. We'll email or call you with the date and location as soon as they're confirmed. Thanks for joining us!"}
                </p>

                <div className="enrollment-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCloseSuccess}
                  >
                    {locale === "ar" ? "تم" : "Done"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
