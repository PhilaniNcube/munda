"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, ArrowRight, ShieldCheck, CloudUpload, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signUpAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const signUpSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  farmName: z.string().min(1, "Farm name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters").regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character"),
  terms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

export default function SignUpPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signUpAction, null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      farmName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  useEffect(() => {
    if (state?.success) {
      toast.success("Account created successfully! Welcome to Munda.");
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

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("farmName", values.farmName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formAction(formData);
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-agri-surface-container-lowest">
      {/* ── Left Panel ────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-2xl m-4 mr-0">
        <Image
          src="/images/crop-aerial.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-agri-primary/70 via-agri-primary/85 to-agri-primary/95" />

        <div className="relative z-10 flex flex-col justify-end p-10 pb-12">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm text-white">
              <Leaf className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-semibold text-white font-heading">
              Munda
            </span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-bold text-white font-heading leading-tight mb-4">
            Precision management for the modern farm.
          </h2>
          <p className="text-body-md text-white/70 max-w-sm mb-8">
            Join thousands of agricultural professionals optimizing their yields
            with data-driven insights.
          </p>

          <div className="flex items-center gap-8">
            <div>
              <p className="text-2xl font-bold text-white font-heading">15k+</p>
              <p className="text-label-caps text-white/60 mt-0.5">
                Active Farms
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-heading">98%</p>
              <p className="text-label-caps text-white/60 mt-0.5">
                Reliability Rate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel (Form) ────────────────────────────── */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-agri-on-surface font-heading mb-2">
            Create your account
          </h1>
          <p className="text-body-md text-agri-on-surface-variant mb-8">
            Enter your details to start managing your agricultural assets.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {form.formState.errors.root && (
                <div className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}

              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="block text-sm font-semibold text-agri-on-surface">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="h-11 bg-agri-surface-container-lowest border-agri-outline-variant rounded-lg text-body-md text-agri-on-surface placeholder:text-agri-outline"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Farm Name */}
              <FormField
                control={form.control}
                name="farmName"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="block text-sm font-semibold text-agri-on-surface">Farm Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Green Valley Estates"
                        className="h-11 bg-agri-surface-container-lowest border-agri-outline-variant rounded-lg text-body-md text-agri-on-surface placeholder:text-agri-outline"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="block text-sm font-semibold text-agri-on-surface">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@farm.com"
                        className="h-11 bg-agri-surface-container-lowest border-agri-outline-variant rounded-lg text-body-md text-agri-on-surface placeholder:text-agri-outline"
                        {...field}
                      />
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
                    <FormLabel className="block text-sm font-semibold text-agri-on-surface">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-11 pr-10 bg-agri-surface-container-lowest border-agri-outline-variant rounded-lg text-body-md text-agri-on-surface placeholder:text-agri-outline"
                          {...field}
                        />
                        <Button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-agri-outline hover:text-agri-on-surface-variant transition-colors"
                          aria-label="Toggle password visibility"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <p className="text-xs text-agri-on-surface-variant">
                      Must be at least 8 characters with one special symbol.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms Checkbox */}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 pt-1 rounded-md">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="mt-0.5 h-4 w-4 rounded border-agri-outline-variant text-agri-primary focus:ring-agri-primary accent-agri-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-body-md text-agri-on-surface-variant leading-snug font-normal">
                        I agree to the{" "}
                        <Link href="#" className="font-semibold text-agri-secondary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="font-semibold text-agri-secondary hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-agri-primary text-white hover:bg-agri-primary-container rounded-lg text-body-md font-semibold shadow-none"
              >
                <span className="flex items-center text-white">
                  {isPending ? "Creating Account..." : "Get Started"}
                  {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
                </span>
              </Button>
            </form>
          </Form>

          {/* Sign In Link */}
          <p className="text-center text-body-md text-agri-on-surface-variant mt-6">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-agri-secondary hover:text-agri-primary transition-colors"
            >
              Log In
            </Link>
          </p>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-agri-outline-variant/30">
            <p className="text-center text-xs text-agri-on-surface-variant/60">
              © 2026 Munda Farm Management. Built for endurance.
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-agri-on-surface-variant/40">
              <ShieldCheck className="h-4 w-4" />
              <CloudUpload className="h-4 w-4" />
              <Lock className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}