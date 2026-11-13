"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CF7_SUBMISSION_API_PATH } from "@/lib/contact-form-7/config";
import type { Cf7InvalidField } from "@/lib/contact-form-7/types";

export const CF7_SUCCESS_DISMISS_MS = 4000;

interface Cf7SubmissionState {
  isSubmitting: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  invalidFields: Cf7InvalidField[] | undefined;
}

export function useCf7Submission() {
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<Cf7SubmissionState>({
    isSubmitting: false,
    successMessage: null,
    errorMessage: null,
    invalidFields: undefined,
  });

  const clearDismissTimeout = useCallback(() => {
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
      dismissTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearDismissTimeout, [clearDismissTimeout]);

  const clearMessages = useCallback(() => {
    clearDismissTimeout();
    setState((prev) => ({
      ...prev,
      successMessage: null,
      errorMessage: null,
      invalidFields: undefined,
    }));
  }, [clearDismissTimeout]);

  const scheduleSuccessDismiss = useCallback(
    (onDismiss?: () => void) => {
      clearDismissTimeout();
      dismissTimeoutRef.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          successMessage: null,
        }));
        onDismiss?.();
        dismissTimeoutRef.current = null;
      }, CF7_SUCCESS_DISMISS_MS);
    },
    [clearDismissTimeout],
  );

  const submitFormData = useCallback(
    async (formData: FormData, successFallback: string, onSuccessReset?: () => void) => {
      clearDismissTimeout();
      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        successMessage: null,
        errorMessage: null,
        invalidFields: undefined,
      }));

      try {
        const response = await fetch(CF7_SUBMISSION_API_PATH, {
          method: "POST",
          body: formData,
        });

        const data = (await response.json()) as {
          ok?: boolean;
          message?: string;
          invalidFields?: Cf7InvalidField[];
        };

        if (data.ok) {
          setState({
            isSubmitting: false,
            successMessage: data.message || successFallback,
            errorMessage: null,
            invalidFields: undefined,
          });
          scheduleSuccessDismiss(onSuccessReset);
          return true;
        }

        setState({
          isSubmitting: false,
          successMessage: null,
          errorMessage: data.message || "Submission failed. Please check your entries and try again.",
          invalidFields: data.invalidFields,
        });
        return false;
      } catch {
        setState({
          isSubmitting: false,
          successMessage: null,
          errorMessage: "Unable to submit your application. Please check your connection and try again.",
          invalidFields: undefined,
        });
        return false;
      }
    },
    [clearDismissTimeout, scheduleSuccessDismiss],
  );

  const setErrorMessage = useCallback((message: string) => {
    setState((prev) => ({
      ...prev,
      errorMessage: message,
      invalidFields: undefined,
    }));
  }, []);

  return {
    ...state,
    clearMessages,
    setErrorMessage,
    submitFormData,
  };
}

export const CF7_FORM_STYLES = {
  dmSans: { fontFamily: "'DM Sans', sans-serif" } as const,
  playfair: { fontFamily: "'Playfair Display', serif" } as const,
  input:
    "w-full rounded-xl border border-[#3F7A4E]/20 bg-white px-4 py-3 text-sm text-[#1a2e1f] placeholder:text-[#5C7A63]/60 outline-none transition-[border-color,box-shadow] focus:border-[#3F7A4E]/50 focus:ring-[3px] focus:ring-[#3F7A4E]/15 disabled:cursor-not-allowed disabled:opacity-60",
  label:
    "block text-xs font-semibold uppercase tracking-[0.14em] text-[#3F7A4E] mb-2",
  textarea:
    "w-full min-h-[140px] rounded-xl border border-[#3F7A4E]/20 bg-white px-4 py-3 text-sm text-[#1a2e1f] placeholder:text-[#5C7A63]/60 outline-none transition-[border-color,box-shadow] focus:border-[#3F7A4E]/50 focus:ring-[3px] focus:ring-[#3F7A4E]/15 disabled:cursor-not-allowed disabled:opacity-60 resize-y",
} as const;

export function cf7FieldError(
  invalidFields: Cf7InvalidField[] | undefined,
  field: string,
): string | undefined {
  return invalidFields?.find((item) => item.field === field)?.message;
}
