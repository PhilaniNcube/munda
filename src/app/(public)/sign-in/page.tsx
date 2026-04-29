"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, Mail, Lock, LogIn, ShieldCheck, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signInAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function SignInPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signInAction, null);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    } else if (state?.errors) {
      Object.entries(state.errors).forEach(([key, messages]) => {
        if (key === "root") {
            form.setError("root", { type: "server", message: (messages as string[])?.[0] });
        } else {
            form.setError(key as any, { type: "server", message: (messages as string[])?.[0] });
        }
      });
    }
  }, [state, form, router]);

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formAction(formData);
    });
  };

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-12">
      {/* ── Background Image ──────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/wheat-field-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-agri-surface/60 backdrop-blur-[2px]" />
      </div>

      {/* ── Sign-In Card ──────────────────────────────────── */}
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white/95 backdrop-blur-sm shadow-lg border border-agri-outline-variant/30 px-8 py-10">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-agri-primary text-white mb-4">
              <Leaf className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-agri-on-surface font-heading">
              Munda
            </h1>
            <p className="text-body-md text-agri-on-surface-variant mt-1">
              Manage your yields with precision and endurance.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {form.formState.errors.root && (
                <div className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-label-caps text-agri-on-surface-variant">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-agri-outline" />
                        <Input
                          type="email"
                          placeholder="farmer@munda.com"
                          className="h-11 pl-10 bg-agri-surface-container-lowest border-agri-outline-variant rounded-lg text-body-md text-agri-on-surface placeholder:text-agri-outline"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-label-caps text-agri-on-surface-variant">Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-label-caps text-agri-primary hover:text-agri-primary-container transition-colors"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-agri-outline" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-11 pl-10 bg-agri-surface-container-lowest border-agri-outline-variant rounded-lg text-body-md text-agri-on-surface placeholder:text-agri-outline"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-agri-primary text-white hover:bg-agri-primary-container rounded-lg text-body-md font-semibold shadow-none mt-2"
              >
                <span className="flex items-center text-white">
                  {isPending ? "Logging in..." : "Log In"}
                  {!isPending && <LogIn className="ml-2 h-4 w-4" />}
                </span>
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="my-6 border-t border-agri-outline-variant/40" />

          {/* Sign Up Link */}
          <p className="text-center text-body-md text-agri-on-surface-variant">
            New to Munda?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-agri-on-surface hover:text-agri-primary transition-colors"
            >
              Create an Account
            </Link>
          </p>
        </div>

        {/* ── Trust Badges ────────────────────────────────── */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-1.5 text-label-caps text-agri-on-surface-variant/70">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure Access
          </div>
          <div className="flex items-center gap-1.5 text-label-caps text-agri-on-surface-variant/70">
            <CloudUpload className="h-3.5 w-3.5" />
            Synced Data
          </div>
        </div>
      </div>
    </div>
  );
}