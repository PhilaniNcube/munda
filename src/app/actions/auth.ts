"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

import { prisma } from "@/lib/db";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  farmName: z.string().min(1, "Farm name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters").regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character"),
});

export async function signInAction(prevState: any, formData: FormData) {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Please check your inputs.",
    };
  }

  const { email, password } = parsed.data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
    
    return { success: true };
  } catch (err: any) {
    return { 
      message: err?.message || "Failed to sign in",
      errors: { root: [err?.message || "Failed to sign in"] }
    };
  }
}

export async function signUpAction(prevState: any, formData: FormData) {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Please check your inputs.",
    };
  }

  const { name, email, password, farmName } = parsed.data;

  try {
    const res = await auth.api.signUpEmail({
      body: { name, email, password },
      headers: await headers(),
    });
    
    if (res?.user?.id) {
      await prisma.farm.create({
        data: {
          name: farmName,
          userId: res.user.id,
        }
      });
    }

    return { success: true };
  } catch (err: any) {
    return { 
      message: err?.message || "Failed to create account",
      errors: { root: [err?.message || "Failed to create account"] }
    };
  }
}
