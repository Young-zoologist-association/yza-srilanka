"use client";

import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, useInView } from "motion/react";
import { AlertCircle, CheckCircle2, FileUp, Loader2, Send, Upload, X } from "lucide-react";
import { Cf7FormField } from "@/components/cf7/Cf7FormField";
import {
  NATURALIST_FORM_INITIAL_VALUES,
  SYMPOSIUM_ACCEPTED_FILE_TYPES,
  SYMPOSIUM_MAX_FILE_BYTES,
  type NaturalistFormValues,
} from "@/lib/contact-form-7/types";
import { CF7_FORM_STYLES, cf7FieldError, useCf7Submission } from "@/lib/contact-form-7/useCf7Submission";
import { formatFileSize } from "@/lib/pdf-archive/pdfPreview";

function validateClient(values: NaturalistFormValues, file: File | null): string | null {
  if (!values.fullName.trim()) return "Full name is required.";
  if (!values.institute.trim()) return "Institute is required.";
  if (!values.country.trim()) return "Country is required.";
  if (!values.email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    return "Please enter a valid email address.";
  }
  if (!values.contact.trim()) return "Contact number is required.";
  if (!values.whatsappNumber.trim()) return "WhatsApp number is required.";
  if (!file) return "Please upload your document.";
  if (file.size > SYMPOSIUM_MAX_FILE_BYTES) return "Document must be 10 MB or smaller.";
  return null;
}

export function NaturalistSubmissionForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [values, setValues] = useState<NaturalistFormValues>(NATURALIST_FORM_INITIAL_VALUES);
  const [file, setFile] = useState<File | null>(null);
  const {
    isSubmitting,
    successMessage,
    errorMessage,
    invalidFields,
    setErrorMessage,
    submitFormData,
  } = useCf7Submission();

  const updateField = useCallback(
    (field: keyof NaturalistFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrorMessage("");
    },
    [setErrorMessage],
  );

  const clearFile = useCallback(() => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const resetForm = useCallback(() => {
    setValues(NATURALIST_FORM_INITIAL_VALUES);
    clearFile();
  }, [clearFile]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const clientError = validateClient(values, file);
      if (clientError) {
        setErrorMessage(clientError);
        return;
      }
      if (!file) return;

      const formData = new FormData();
      formData.append("submission-type", "Naturalist");
      formData.append("full-name", values.fullName.trim());
      formData.append("institute", values.institute.trim());
      formData.append("country", values.country.trim());
      formData.append("email", values.email.trim());
      formData.append("contact", values.contact.trim());
      formData.append("whatsapp-number", values.whatsappNumber.trim());
      formData.append("document-upload", file);

      const ok = await submitFormData(
        formData,
        "Thank you — your naturalist submission has been received successfully.",
        resetForm,
      );
      if (!ok) return;
    },
    [file, resetForm, setErrorMessage, submitFormData, values],
  );

  return (
    <section ref={sectionRef} className="page-snap-section py-14 md:py-20 bg-[#fafaf8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span
            className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
            style={CF7_FORM_STYLES.dmSans}
          >
            Apply Now
          </span>
          <h2
            className="mt-3 text-[#1a2e1f] leading-tight"
            style={{
              ...CF7_FORM_STYLES.playfair,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Naturalist Submission Form
          </h2>
          <p className="mt-4 text-[#5C7A63] text-sm md:text-base max-w-xl mx-auto" style={CF7_FORM_STYLES.dmSans}>
            Submit your application to join the YZA naturalist programme. All fields are required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[1.75rem] overflow-hidden bg-white shadow-xl shadow-[#3F7A4E]/10 ring-1 ring-[#3F7A4E]/10"
        >
          <div className="h-1 bg-gradient-to-r from-[#F2A93B] via-[#3F7A4E] to-[#F2A93B]" />

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-6" noValidate>
            {successMessage ? (
              <div
                className="flex items-start gap-3 rounded-xl border border-[#3F7A4E]/25 bg-[#3F7A4E]/8 px-4 py-3 text-[#1a2e1f]"
                role="status"
              >
                <CheckCircle2 className="w-5 h-5 text-[#3F7A4E] shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed" style={CF7_FORM_STYLES.dmSans}>
                  {successMessage}
                </p>
              </div>
            ) : null}

            {errorMessage ? (
              <div
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed" style={CF7_FORM_STYLES.dmSans}>
                  {errorMessage}
                </p>
              </div>
            ) : null}

            <div className="grid sm:grid-cols-2 gap-5">
              <Cf7FormField
                id="full-name"
                label="Full Name"
                required
                error={cf7FieldError(invalidFields, "full-name")}
              >
                <input
                  id="full-name"
                  name="full-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={values.fullName}
                  onChange={updateField("fullName")}
                  disabled={isSubmitting}
                  className={CF7_FORM_STYLES.input}
                  style={CF7_FORM_STYLES.dmSans}
                  placeholder="Your full name"
                />
              </Cf7FormField>

              <Cf7FormField
                id="institute"
                label="Institute"
                required
                error={cf7FieldError(invalidFields, "institute")}
              >
                <input
                  id="institute"
                  name="institute"
                  type="text"
                  required
                  value={values.institute}
                  onChange={updateField("institute")}
                  disabled={isSubmitting}
                  className={CF7_FORM_STYLES.input}
                  style={CF7_FORM_STYLES.dmSans}
                  placeholder="University or organization"
                />
              </Cf7FormField>

              <Cf7FormField
                id="country"
                label="Country"
                required
                error={cf7FieldError(invalidFields, "country")}
              >
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  autoComplete="country-name"
                  value={values.country}
                  onChange={updateField("country")}
                  disabled={isSubmitting}
                  className={CF7_FORM_STYLES.input}
                  style={CF7_FORM_STYLES.dmSans}
                  placeholder="Country of residence"
                />
              </Cf7FormField>

              <Cf7FormField
                id="email"
                label="Email"
                required
                error={cf7FieldError(invalidFields, "email")}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={updateField("email")}
                  disabled={isSubmitting}
                  className={CF7_FORM_STYLES.input}
                  style={CF7_FORM_STYLES.dmSans}
                  placeholder="you@example.com"
                />
              </Cf7FormField>

              <Cf7FormField
                id="contact"
                label="Contact Number"
                required
                error={cf7FieldError(invalidFields, "contact")}
              >
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={values.contact}
                  onChange={updateField("contact")}
                  disabled={isSubmitting}
                  className={CF7_FORM_STYLES.input}
                  style={CF7_FORM_STYLES.dmSans}
                  placeholder="+94 XX XXX XXXX"
                />
              </Cf7FormField>

              <Cf7FormField
                id="whatsapp-number"
                label="WhatsApp Number"
                required
                error={cf7FieldError(invalidFields, "whatsapp-number")}
              >
                <input
                  id="whatsapp-number"
                  name="whatsapp-number"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={values.whatsappNumber}
                  onChange={updateField("whatsappNumber")}
                  disabled={isSubmitting}
                  className={CF7_FORM_STYLES.input}
                  style={CF7_FORM_STYLES.dmSans}
                  placeholder="+94 XX XXX XXXX"
                />
              </Cf7FormField>
            </div>

            <Cf7FormField
              id="document-upload"
              label="Supporting Document"
              required
              error={cf7FieldError(invalidFields, "document-upload")}
            >
              <input
                ref={fileInputRef}
                id="document-upload"
                name="document-upload"
                type="file"
                required
                accept={SYMPOSIUM_ACCEPTED_FILE_TYPES}
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                disabled={isSubmitting}
                className="sr-only"
              />

              {!file ? (
                <label
                  htmlFor="document-upload"
                  className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#3F7A4E]/25 bg-[#3F7A4E]/[0.03] px-6 py-10 cursor-pointer transition-colors hover:border-[#F2A93B]/45 hover:bg-[#F2A93B]/[0.04]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2A93B]/15">
                    <Upload className="w-5 h-5 text-[#b87a1a]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[#1a2e1f]" style={CF7_FORM_STYLES.dmSans}>
                      Click to upload your document
                    </p>
                    <p className="mt-1 text-xs text-[#5C7A63]" style={CF7_FORM_STYLES.dmSans}>
                      PDF, DOC, or DOCX · Maximum 10 MB
                    </p>
                  </div>
                </label>
              ) : (
                <div className="flex items-center gap-4 rounded-xl border border-[#3F7A4E]/20 bg-[#3F7A4E]/[0.04] px-4 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2A93B]/15">
                    <FileUp className="w-5 h-5 text-[#b87a1a]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#1a2e1f]" style={CF7_FORM_STYLES.dmSans}>
                      {file.name}
                    </p>
                    <p className="text-xs text-[#5C7A63]" style={CF7_FORM_STYLES.dmSans}>
                      {formatFileSize(file.size) ?? `${Math.round(file.size / 1024)} KB`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    disabled={isSubmitting}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#5C7A63] transition-colors hover:bg-[#3F7A4E]/10 hover:text-[#3F7A4E] disabled:opacity-50"
                    aria-label="Remove selected file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </Cf7FormField>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={isSubmitting ? undefined : { scale: 1.02 }}
                whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#3F7A4E] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3F7A4E]/25 transition-colors hover:bg-[#2D5A3D] disabled:cursor-not-allowed disabled:opacity-70"
                style={CF7_FORM_STYLES.dmSans}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
