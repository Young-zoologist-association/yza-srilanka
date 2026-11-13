"use client";

import type { ReactNode } from "react";
import { CF7_FORM_STYLES } from "@/lib/contact-form-7/useCf7Submission";

export function Cf7FormField({
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
      <label htmlFor={id} className={CF7_FORM_STYLES.label} style={CF7_FORM_STYLES.dmSans}>
        {label}
        {required ? <span className="text-[#F2A93B] ml-0.5">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-red-600" style={CF7_FORM_STYLES.dmSans} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Cf7FormAlerts({
  successMessage,
  errorMessage,
}: {
  successMessage: string | null;
  errorMessage: string | null;
}) {
  return (
    <>
      {successMessage ? (
        <div
          className="flex items-start gap-3 rounded-xl border border-[#3F7A4E]/25 bg-[#3F7A4E]/8 px-4 py-3 text-[#1a2e1f]"
          role="status"
        >
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
          <p className="text-sm leading-relaxed" style={CF7_FORM_STYLES.dmSans}>
            {errorMessage}
          </p>
        </div>
      ) : null}
    </>
  );
}
