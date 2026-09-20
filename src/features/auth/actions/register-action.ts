// features/auth/actions/register-action.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import {
  registerSchema,
  type RegisterInput,
} from "../schemas/auth.schema";
import { RegisterResult } from "../types";

export async function registerAction(
  input: RegisterInput
): Promise<Result<RegisterResult>> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  return fetchJson<RegisterResult>("/api/auth/register", {
    method: "POST",
    authToken: null,
    body: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      password: parsed.data.password,
    },
  });
}