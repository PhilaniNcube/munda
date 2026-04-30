import { SupportContent } from "@/components/dashboard/support/support-content";

export default function SupportPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-agri-outline-variant pb-6">
        <h1 className="text-h1 text-agri-on-surface">Support & Help Center</h1>
        <p className="text-body-md text-agri-on-surface-variant mt-2">
          Get help with your account, find answers to common questions, or contact our support team.
        </p>
      </div>

      <SupportContent />
    </div>
  );
}
