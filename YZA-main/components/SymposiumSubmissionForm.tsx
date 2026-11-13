"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  FileUp,
  Loader2,
  Send,
  Upload,
  X,
} from "lucide-react";
import { SYMPOSIUM_SUBMISSION_API_PATH } from "@/lib/contact-form-7/config";
import { CF7_SUCCESS_DISMISS_MS } from "@/lib/contact-form-7/useCf7Submission";
import {
  SYMPOSIUM_ACCEPTED_FILE_TYPES,
  SYMPOSIUM_FORM_INITIAL_VALUES,
  SYMPOSIUM_MAX_FILE_BYTES,
  type Cf7InvalidField,
  type SymposiumFormValues,
} from "@/lib/contact-form-7/types";
import { formatFileSize } from "@/lib/pdf-archive/pdfPreview";

const DM_SANS = { fontFamily: "'DM Sans', sans-serif" } as const;
const PLAYFAIR = { fontFamily: "'Playfair Display', serif" } as const;

const INPUT_CLASS =
  "w-full rounded-xl border border-[#3F7A4E]/20 bg-white px-4 py-3 text-sm text-[#1a2e1f] placeholder:text-[#5C7A63]/60 outline-none transition-[border-color,box-shadow] focus:border-[#3F7A4E]/50 focus:ring-[3px] focus:ring-[#3F7A4E]/15 disabled:cursor-not-allowed disabled:opacity-60";

const LABEL_CLASS =
  "block text-xs font-semibold uppercase tracking-[0.14em] text-[#3F7A4E] mb-2";

function fieldError(
  invalidFields: Cf7InvalidField[] | undefined,
  field: string,
): string | undefined {
  return invalidFields?.find((item) => item.field === field)?.message;
}

function validateClient(values: SymposiumFormValues, file: File | null): string | null {
  if (!values.fullName.trim()) return "Full name is required.";
  if (!values.institute.trim()) return "Institute is required.";
  if (!values.country.trim()) return "Country is required.";
  if (!values.email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    return "Please enter a valid email address.";
  }
  if (!values.presentationType) return "Presentation type is required.";
  if (!values.contact.trim()) return "Contact number is required.";
  if (!values.whatsappNumber.trim()) return "WhatsApp number is required.";
  if (!file) return "Please upload your research document.";
  if (file.size > SYMPOSIUM_MAX_FILE_BYTES) return "Document must be 10 MB or smaller.";
  return null;
}

function FormField({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS} style={DM_SANS}>
        {label}
        {required ? <span className="text-[#F2A93B] ml-0.5">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-red-600" style={DM_SANS} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SymposiumSubmissionForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successDismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [values, setValues] = useState<SymposiumFormValues>(SYMPOSIUM_FORM_INITIAL_VALUES);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [invalidFields, setInvalidFields] = useState<Cf7InvalidField[] | undefined>();

  const updateField = useCallback(
    (field: keyof SymposiumFormValues) =>
      (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues((prev) => ({ ...prev, [field]: event.target.value }));
        setErrorMessage(null);
        setInvalidFields(undefined);
      },
    [],
  );

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setErrorMessage(null);
    setInvalidFields(undefined);
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const resetForm = useCallback(() => {
    setValues(SYMPOSIUM_FORM_INITIAL_VALUES);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  useEffect(() => {
    return () => {
      if (successDismissTimeoutRef.current) {
        clearTimeout(successDismissTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (successDismissTimeoutRef.current) {
        clearTimeout(successDismissTimeoutRef.current);
        successDismissTimeoutRef.current = null;
      }
      setSuccessMessage(null);
      setErrorMessage(null);
      setInvalidFields(undefined);

      const clientError = validateClient(values, file);
      if (clientError) {
        setErrorMessage(clientError);
        return;
      }

      if (!file) return;

      const formData = new FormData();
      formData.append("full-name", values.fullName.trim());
      formData.append("institute", values.institute.trim());
      formData.append("country", values.country.trim());
      formData.append("email", values.email.trim());
      formData.append("presentation-type", values.presentationType);
      formData.append("contact", values.contact.trim());
      formData.append("whatsapp-number", values.whatsappNumber.trim());
      formData.append("document-upload", file);

      setIsSubmitting(true);

      try {
        const response = await fetch(SYMPOSIUM_SUBMISSION_API_PATH, {
          method: "POST",
          body: formData,
        });

        const data = (await response.json()) as {
          ok?: boolean;
          message?: string;
          invalidFields?: Cf7InvalidField[];
        };

        if (data.ok) {
          if (successDismissTimeoutRef.current) {
            clearTimeout(successDismissTimeoutRef.current);
          }

          setSuccessMessage(
            data.message ||
              "Thank you — your symposium submission has been received successfully.",
          );

          successDismissTimeoutRef.current = setTimeout(() => {
            setSuccessMessage(null);
            resetForm();
            successDismissTimeoutRef.current = null;
          }, CF7_SUCCESS_DISMISS_MS);
          return;
        }

        setErrorMessage(data.message || "Submission failed. Please check your entries and try again.");
        setInvalidFields(data.invalidFields);
      } catch {
        setErrorMessage("Unable to submit your application. Please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [file, resetForm, values],
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
            className="text-[#3F7A4E] text-xs tracking-[0.25em] uppercase font-semibold"
            style={DM_SANS}
          >
            Submit Your Research
          </span>
          <h2
            className="mt-3 text-[#1a2e1f] leading-tight"
            style={{
              ...PLAYFAIR,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Symposium Submission Form
          </h2>
          <p className="mt-4 text-[#5C7A63] text-sm md:text-base max-w-xl mx-auto" style={DM_SANS}>
            Complete the form below to submit your abstract or research paper for the symposium.
            All fields are required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[1.75rem] overflow-hidden bg-white shadow-xl shadow-[#3F7A4E]/10 ring-1 ring-[#3F7A4E]/10"
        >
          <div className="h-1 bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E]" />

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-6" noValidate>
            {successMessage ? (
              <div
                className="flex items-start gap-3 rounded-xl border border-[#3F7A4E]/25 bg-[#3F7A4E]/8 px-4 py-3 text-[#1a2e1f]"
                role="status"
              >
                <CheckCircle2 className="w-5 h-5 text-[#3F7A4E] shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed" style={DM_SANS}>
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
                <p className="text-sm leading-relaxed" style={DM_SANS}>
                  {errorMessage}
                </p>
              </div>
            ) : null}

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField
                id="full-name"
                label="Full Name"
                required
                error={fieldError(invalidFields, "full-name")}
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
                  className={INPUT_CLASS}
                  style={DM_SANS}
                  placeholder="Your full name"
                />
              </FormField>

              <FormField
                id="institute"
                label="Institute"
                required
                error={fieldError(invalidFields, "institute")}
              >
                <input
                  id="institute"
                  name="institute"
                  type="text"
                  required
                  value={values.institute}
                  onChange={updateField("institute")}
                  disabled={isSubmitting}
                  className={INPUT_CLASS}
                  style={DM_SANS}
                  placeholder="University or organization"
                />
              </FormField>

              <FormField
                id="country"
                label="Country"
                required
                error={fieldError(invalidFields, "country")}
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
                  className={INPUT_CLASS}
                  style={DM_SANS}
                  placeholder="Country of residence"
                />
              </FormField>

              <FormField
                id="email"
                label="Email"
                required
                error={fieldError(invalidFields, "email")}
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
                  className={INPUT_CLASS}
                  style={DM_SANS}
                  placeholder="you@example.com"
                />
              </FormField>

              <FormField
                id="presentation-type"
                label="Presentation Type"
                required
                error={fieldError(invalidFields, "presentation-type")}
              >
                <select
                  id="presentation-type"
                  name="presentation-type"
                  required
                  value={values.presentationType}
                  onChange={updateField("presentationType")}
                  disabled={isSubmitting}
                  className={`${INPUT_CLASS} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                  style={{
                    ...DM_SANS,
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%233F7A4E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="" disabled>
                    Select presentation type
                  </option>
                  <option value="Virtual">Virtual</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </FormField>

              <FormField
                id="contact"
                label="Contact Number"
                required
                error={fieldError(invalidFields, "contact")}
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
                  className={INPUT_CLASS}
                  style={DM_SANS}
                  placeholder="+94 XX XXX XXXX"
                />
              </FormField>

              <FormField
                id="whatsapp-number"
                label="WhatsApp Number"
                required
                error={fieldError(invalidFields, "whatsapp-number")}
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
                  className={INPUT_CLASS}
                  style={DM_SANS}
                  placeholder="+94 XX XXX XXXX"
                />
              </FormField>
            </div>

            <FormField
              id="document-upload"
              label="Research Document"
              required
              error={fieldError(invalidFields, "document-upload")}
            >
              <div className="relative">
                <input
                  ref={fileInputRef}
                  id="document-upload"
                  name="document-upload"
                  type="file"
                  required
                  accept={SYMPOSIUM_ACCEPTED_FILE_TYPES}
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  className="sr-only"
                />

                {!file ? (
                  <label
                    htmlFor="document-upload"
                    className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#3F7A4E]/25 bg-[#3F7A4E]/[0.03] px-6 py-10 cursor-pointer transition-colors hover:border-[#3F7A4E]/45 hover:bg-[#3F7A4E]/[0.06]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3F7A4E]/10">
                      <Upload className="w-5 h-5 text-[#3F7A4E]" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#1a2e1f]" style={DM_SANS}>
                        Click to upload your document
                      </p>
                      <p className="mt-1 text-xs text-[#5C7A63]" style={DM_SANS}>
                        PDF, DOC, or DOCX · Maximum 10 MB
                      </p>
                    </div>
                  </label>
                ) : (
                  <div className="flex items-center gap-4 rounded-xl border border-[#3F7A4E]/20 bg-[#3F7A4E]/[0.04] px-4 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3F7A4E]/10">
                      <FileUp className="w-5 h-5 text-[#3F7A4E]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#1a2e1f]" style={DM_SANS}>
                        {file.name}
                      </p>
                      <p className="text-xs text-[#5C7A63]" style={DM_SANS}>
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
              </div>
            </FormField>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={isSubmitting ? undefined : { scale: 1.02 }}
                whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#3F7A4E] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3F7A4E]/25 transition-colors hover:bg-[#2D5A3D] disabled:cursor-not-allowed disabled:opacity-70"
                style={DM_SANS}
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
