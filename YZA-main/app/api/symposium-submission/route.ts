import { NextRequest, NextResponse } from "next/server";
import { isWordPressConfigured } from "@/lib/api/client";
import { WordPressApiError } from "@/lib/api/errors";
import { submitSymposiumSubmission } from "@/lib/contact-form-7/submitSymposiumSubmission";
import {
  resolveCf7FormId,
  resolveCf7FormKind,
  validateCf7Submission,
} from "@/lib/contact-form-7/validateSubmission";

export async function POST(request: NextRequest) {
  if (!isWordPressConfigured()) {
    return NextResponse.json(
      { ok: false, message: "WordPress API is not configured." },
      { status: 503 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid form submission." },
      { status: 400 },
    );
  }

  const formKind = resolveCf7FormKind(formData);
  const validationError = validateCf7Submission(formData, formKind);
  if (validationError) {
    return NextResponse.json({ ok: false, message: validationError }, { status: 400 });
  }

  try {
    const result = await submitSymposiumSubmission(formData, resolveCf7FormId(formKind));
    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch (error) {
    const message =
      error instanceof WordPressApiError
        ? error.message
        : "Unable to submit your application. Please try again later.";

    return NextResponse.json({ ok: false, message }, { status: 502 });
  }
}
