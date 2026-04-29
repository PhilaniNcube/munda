import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Sprout,
  Package,
  Cpu,
  Shield,
  Brain,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const stats = [
  { value: "14.2%", label: "Yield Growth" },
  { value: "2.4k+", label: "Active Fields" },
  { value: "30%", label: "Water Savings" },
  { value: "99.9%", label: "Data Accuracy" },
];

const capabilities = [
  {
    icon: BarChart3,
    title: "Financial Tracking & Forecasting",
    description:
      "Monitor every dollar spent and earned. Real-time dashboards provide revenue and cost breakdowns, automated expense categorisation, and full financial transparency.",
    links: ["KPI Metrics", "Tax Ready"],
    image: null,
  },
  {
    icon: Sprout,
    title: "Crop Management",
    description:
      "Detailed lifecycle tracking from seeding to harvest. Log soil health, pesticide application, irrigation schedules, and more — all with precision GPS tagging.",
    links: null,
    image: "/images/crop-aerial.png",
  },
  {
    icon: Package,
    title: "Inventory Alerts",
    description:
      "Never run low on essential supplies. Automated triggers for fuel, feed, seed, and chemicals keep stock levels based on current consumption rates.",
    links: null,
    image: null,
  },
  {
    icon: Cpu,
    title: "Smart Machinery Integration",
    description:
      "Connect your fleet directly to Munda. Track engine hours, maintenance schedules, fuel efficiency, and overall usage across your entire fleet.",
    links: null,
    image: "/images/smart-machinery.png",
  },
];

const plans = [
  {
    name: "Small Farm",
    price: "$89",
    period: "/month",
    description:
      "Essential tools for independent growers managing up to 200 acres.",
    features: [
      "Core Crop Tracking",
      "Inventory Management",
      "Basic Financial Reports",
    ],
    cta: "Select Basic",
    variant: "outline" as const,
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "$249",
    period: "/month",
    description:
      "Advanced analytics and unlimited fields for growing operations.",
    features: [
      "Everything in Small Farm",
      "Machinery Telemetry",
      "Field Forecasting Models",
      "Priority Support",
    ],
    cta: "Start 30-Day Free Trial",
    variant: "default" as const,
    highlight: true,
  },
  {
    name: "Custom",
    price: "Contact",
    period: "",
    description:
      "Tailored solutions for multi-region agri-business and cooperatives.",
    features: [
      "White-Label Access",
      "API & ERP Integration",
      "Dedicated Account Manager",
    ],
    cta: "Talk to Sales",
    variant: "outline" as const,
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-agri-primary">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-farmer.png"
            alt="Farmer in field"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-agri-primary/95 via-agri-primary/80 to-agri-primary/50" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            <span className="inline-block text-label-caps text-agri-on-primary p-3 bg-agri-on-surface mb-4 tracking-widest">
              Farm Management Reimagined
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight font-heading mb-6">
              Precision Farm
              <br />
              Management with{" "}
              <span className="text-agri-primary-fixed">Munda</span>.
            </h1>
            <p className="text-body-lg text-agri-on-primary max-w-lg mb-8">
              Streamline your agricultural operations with a platform designed
              for endurance and data-driven intelligence. Built for modern
              professionals who demand clarity and results.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Button
                render={<Link href="/dashboard" />}
                size="lg"
                className="bg-white text-agri-primary hover:bg-agri-primary-fixed hover:text-white px-6 h-12 text-body-md font-semibold shadow-none"
              >
                Start Managing Your Farm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 hover:bg-agri-on-surface px-6 h-12 text-body-md font-semibold bg-transparent shadow-none"
              >
               <span className="text-agri-on-primary"> View Live Demo</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/15">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
              {stats.map((stat) => (
                <div key={stat.label} className="py-5 md:py-6 px-4 md:px-6">
                  <p className="text-2xl md:text-3xl font-bold text-white font-heading">
                    {stat.value}
                  </p>
                  <p className="text-label-caps text-agri-on-primary mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Essential Capabilities ────────────────────────── */}
      <section id="features" className="py-20 md:py-28 bg-agri-surface">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="mb-12">
            <h2 className="text-h1 text-agri-on-surface">
              Essential Capabilities
            </h2>
            <p className="text-body-lg text-agri-on-surface-variant mt-2 max-w-xl">
              The core tools required for endurance-focused farm management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {capabilities.map((cap) => (
              <Card
                key={cap.title}
                className="elevation-1 overflow-hidden group hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-6 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-agri-surface-container-high text-agri-primary mb-4">
                        <cap.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-h3 text-agri-on-surface mb-2">
                        {cap.title}
                      </h3>
                      <p className="text-body-md text-agri-on-surface-variant">
                        {cap.description}
                      </p>
                      {cap.links && (
                        <div className="flex gap-4 mt-4">
                          {cap.links.map((link) => (
                            <a
                              key={link}
                              href="#"
                              className="text-body-md text-agri-primary font-medium hover:underline inline-flex items-center gap-1"
                            >
                              {link}
                              <ChevronRight className="h-3.5 w-3.5" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    {cap.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={cap.image}
                          alt={cap.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for Resilience ──────────────────────────── */}
      <section
        id="about"
        className="py-20 md:py-28 bg-agri-surface-container-low"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-label-caps text-agri-secondary mb-3 block tracking-widest">
                Why Munda?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-agri-on-surface font-heading leading-tight mb-8">
                Built for Resilience.
                <br />
                Powered by Intelligence.
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-agri-primary text-white">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-h3 text-agri-on-surface mb-1">
                      Endurance Engineering
                    </h3>
                    <p className="text-body-md text-agri-on-surface-variant">
                      Our platform is architected to handle high-density data
                      straight through harvest without slowing down, ensuring
                      100% reliability in the field.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-agri-primary text-white">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-h3 text-agri-on-surface mb-1">
                      Data-Driven Decisions
                    </h3>
                    <p className="text-body-md text-agri-on-surface-variant">
                      Transform raw data into actionable intelligence. Analyse
                      multi-year trends to optimise seed choices and irrigation
                      timing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/images/tractor-field.png"
                alt="Modern agricultural tractor in field"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────── */}
      {/* <section id="pricing" className="py-20 md:py-28 bg-agri-surface">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-h1 text-agri-on-surface">
              Professional Plans
            </h2>
            <p className="text-body-lg text-agri-on-surface-variant mt-2 max-w-lg mx-auto">
              Scaled for every operation, from family farms to industrial
              enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`overflow-hidden transition-shadow ${
                  plan.highlight
                    ? "border-agri-primary border-2 shadow-lg relative"
                    : "elevation-1 hover:shadow-md"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 bg-agri-primary text-agri-on-primary text-center py-1.5 text-label-caps tracking-wider">
                    Recommended
                  </div>
                )}
                <CardContent
                  className={`p-6 flex flex-col h-full ${plan.highlight ? "pt-11" : ""}`}
                >
                  <div className="mb-4">
                    <p className="text-label-caps text-agri-on-surface-variant mb-2">
                      {plan.name}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-agri-on-surface font-heading">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-body-md text-agri-on-surface-variant">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-body-md text-agri-on-surface-variant mb-6">
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-body-md text-agri-on-surface"
                      >
                        <Check className="h-4 w-4 text-agri-primary mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.variant}
                    className={`w-full rounded-md shadow-none ${
                      plan.highlight
                        ? "bg-agri-primary text-agri-on-primary hover:bg-agri-primary-container"
                        : "border-agri-outline text-agri-on-surface hover:bg-agri-surface-container-high"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Newsletter CTA ────────────────────────────────── */}
      <section className="py-16 bg-agri-surface-container">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-h2 text-agri-on-surface mb-2">
              Stay informed with the Munda Pulse
            </h2>
            <p className="text-body-md text-agri-on-surface-variant mb-6">
              Receive monthly insights on operational efficiencies and
              industry updates.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white border-agri-outline-variant rounded-md h-10"
              />
              <Button className="bg-agri-primary text-agri-on-primary hover:bg-agri-primary-container rounded-md px-5 shadow-none h-10">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

