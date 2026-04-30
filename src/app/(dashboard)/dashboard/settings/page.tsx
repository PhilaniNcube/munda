import { SettingsForm } from "@/components/dashboard/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-agri-outline-variant pb-6">
        <h1 className="text-h1 text-agri-on-surface">Settings</h1>
        <p className="text-body-md text-agri-on-surface-variant mt-2">
          Manage your account settings, farm configurations, and notification preferences.
        </p>
      </div>

      <div className="max-w-4xl">
        <SettingsForm />
      </div>
    </div>
  );
}
