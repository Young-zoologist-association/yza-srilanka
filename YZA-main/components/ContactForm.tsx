"use client";

import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, useInView } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Cf7FormField } from "@/components/cf7/Cf7FormField";
import { CONTACT_FORM_INITIAL_VALUES, type ContactFormValues } from "@/lib/contact-form-7/types";
import { CF7_FORM_STYLES, cf7FieldError, useCf7Submission } from "@/lib/contact-form-7/useCf7Submission";

function validateClient(values: ContactFormValues): string | null {
  if (!values.fullName.trim()) return "Full name is required.";
  if (!values.email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    return "Please enter a valid email address.";
  }
  if (!values.message.trim()) return "Message is required.";
  return null;
}

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [values, setValues] = useState<ContactFormValues>(CONTACT_FORM_INITIAL_VALUES);
  const {
    isSubmitting,
    successMessage,
    errorMessage,
    invalidFields,
    setErrorMessage,
    submitFormData,
  } = useCf7Submission();

  const updateField = useCallback(
    (field: keyof ContactFormValues) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((prev) => ({ ...prev, [field]: event.target.value }));
        setErrorMessage("");
      },
    [setErrorMessage],
  );

  const resetForm = useCallback(() => {
    setValues(CONTACT_FORM_INITIAL_VALUES);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const clientError = validateClient(values);
      if (clientError) {
        setErrorMessage(clientError);
        return;
      }

      const formData = new FormData();
      formData.append("submission-type", "Contact");
      formData.append("full-name", values.fullName.trim());
      formData.append("email", values.email.trim());
      formData.append("message", values.message.trim());

      const ok = await submitFormData(
        formData,
        "Thank you — your message has been sent successfully.",
        resetForm,
      );
      if (!ok) return;
    },
    [resetForm, setErrorMessage, submitFormData, values],
  );

  return (
    <section ref={sectionRef} className="page-snap-section py-14 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span
            className="text-[#3F7A4E] text-xs tracking-[0.25em] uppercase font-semibold"
            style={CF7_FORM_STYLES.dmSans}
          >
            Send a Message
          </span>
          <h2
            className="mt-3 text-[#1a2e1f] leading-tight"
            style={{
              ...CF7_FORM_STYLES.playfair,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Contact Form
          </h2>
          <p className="mt-4 text-[#5C7A63] text-sm md:text-base max-w-xl mx-auto" style={CF7_FORM_STYLES.dmSans}>
            Have a question or inquiry? Fill out the form below and our team will get back to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[1.75rem] overflow-hidden bg-[#fafaf8] shadow-xl shadow-[#3F7A4E]/10 ring-1 ring-[#3F7A4E]/10"
        >
          <div className="h-1 bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E]" />

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
            </div>

            <Cf7FormField
              id="message"
              label="Message"
              required
              error={cf7FieldError(invalidFields, "message")}
            >
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={values.message}
                onChange={updateField("message")}
                disabled={isSubmitting}
                className={CF7_FORM_STYLES.textarea}
                style={CF7_FORM_STYLES.dmSans}
                placeholder="How can we help you?"
              />
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
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
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
