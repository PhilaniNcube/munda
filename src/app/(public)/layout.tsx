import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-agri-surface flex flex-col">
      {/* ── Navigation ────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-agri-outline-variant/40 bg-agri-surface/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-agri-primary text-white">
              <Leaf className="h-4.5 w-4.5" />
            </div>
            <span className="text-h3 text-agri-on-surface">Munda</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-body-md text-agri-on-surface-variant hover:text-agri-on-surface transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-body-md text-agri-on-surface-variant hover:text-agri-on-surface transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-body-md text-agri-on-surface-variant hover:text-agri-on-surface transition-colors"
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden sm:inline-flex text-body-md text-agri-on-surface-variant hover:text-agri-on-surface transition-colors"
            >
              Login
            </Link>
            <Button
              render={<Link href="/sign-up" />}
              className="bg-agri-primary text-agri-on-primary hover:bg-agri-primary-container rounded-md px-5 shadow-none"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Page Content ──────────────────────────────────── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-agri-outline-variant/40 bg-agri-surface py-10">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-agri-primary text-white">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="font-heading font-semibold text-agri-on-surface">
                Munda
              </span>
            </div>

            <p className="text-body-md text-agri-on-surface-variant">
              © 2026 Munda Farm Management. Built for permanence.
            </p>

            <div className="flex items-center gap-6 text-body-md text-agri-on-surface-variant">
              <a
                href="#"
                className="hover:text-agri-on-surface transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-agri-on-surface transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-agri-on-surface transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
