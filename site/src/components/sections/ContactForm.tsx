"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  CONTACT_TOPICS,
  DEFAULT_TOPIC,
  isTopic,
  type ContactTopic,
} from "@/lib/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Errors = Record<string, string>;

const fieldClass =
  "h-12 rounded-xl border-input bg-white text-base shadow-none focus-visible:ring-turquoise/40";

export function ContactForm() {
  const params = useSearchParams();
  const urlTopic = params.get("topic");
  const [topic, setTopic] = useState<ContactTopic>(
    isTopic(urlTopic) ? urlTopic : DEFAULT_TOPIC,
  );
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Sync the topic when arriving via a ?topic= link (e.g. the "Become a
  // Retailer" CTA) — needed because this is a single page and the form doesn't
  // remount on an in-page click.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isTopic(urlTopic)) setTopic(urlTopic);
  }, [urlTopic]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      topic: String(fd.get("topic") ?? DEFAULT_TOPIC),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setDone(true);
        toast.success("Thanks! Your message is on its way.");
        form.reset();
        setTopic(DEFAULT_TOPIC);
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        toast.error("Please fix the highlighted fields.");
        return;
      }
      if (res.status === 503 || data.error === "not_configured") {
        toast.error("Our form isn't live yet — please email us directly.");
        return;
      }
      toast.error("Something went wrong — please email us directly.");
    } catch {
      toast.error("Network error — please email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-blush p-8 text-center sm:p-10">
        <h3 className="display-md text-turquoise-deep">Grazie!</h3>
        <p className="mt-3 text-muted-foreground text-pretty">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 inline-flex items-center gap-1.5 font-semibold text-turquoise-deep underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot (hidden from people, catches bots) */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name} required>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            className={fieldClass}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email} required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            aria-invalid={!!errors.email}
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone" hint="Optional">
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(302) 555-0123"
            className={fieldClass}
          />
        </Field>
        <Field label="What's this about?" htmlFor="topic">
          <div className="relative">
            <select
              id="topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value as ContactTopic)}
              className={cn(
                fieldClass,
                "w-full cursor-pointer appearance-none pl-3.5 pr-14 font-medium text-charcoal transition-colors hover:border-turquoise/60",
              )}
            >
              {CONTACT_TOPICS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {/* Obvious dropdown affordance — clicks pass through to the select */}
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
              <span className="flex size-7 items-center justify-center rounded-full bg-turquoise text-cream">
                <ChevronDown className="size-4" strokeWidth={2.5} aria-hidden />
              </span>
            </span>
          </div>
        </Field>
      </div>

      <Field label="Message" htmlFor="message" error={errors.message} required>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell us what you're after — a case of Buttercakes, wholesale info, a question about visiting…"
          aria-invalid={!!errors.message}
          className="rounded-xl border-input bg-white text-base shadow-none focus-visible:ring-turquoise/40"
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-turquoise px-9 text-lg font-semibold text-cream shadow-[0_12px_28px_-12px_rgba(0,156,183,0.7)] transition-all hover:brightness-95 active:translate-y-px disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={htmlFor} className="text-sm font-semibold text-charcoal">
          {label}
          {required ? <span className="text-coral"> *</span> : null}
        </Label>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="text-sm font-medium text-coral">{error}</p> : null}
    </div>
  );
}
