/** Shared contact-form contract (used by the form and the API route). */

export const CONTACT_TOPICS = [
  { value: "general", label: "General question" },
  { value: "visit", label: "Visiting / retail" },
  { value: "wholesale", label: "Wholesale & supply" },
  { value: "shipping", label: "Ship a case of Buttercakes" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export const DEFAULT_TOPIC: ContactTopic = "general";

export function isTopic(value: unknown): value is ContactTopic {
  return CONTACT_TOPICS.some((t) => t.value === value);
}

export function topicLabel(value: string): string {
  return CONTACT_TOPICS.find((t) => t.value === value)?.label ?? "General question";
}

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  topic: ContactTopic;
  message: string;
  /** Honeypot — must be empty. */
  company?: string;
};

export type ValidationResult =
  | { ok: true; data: Required<Pick<ContactPayload, "name" | "email" | "topic" | "message">> & ContactPayload }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: Partial<ContactPayload>): ValidationResult {
  const errors: Record<string, string> = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();
  const topic = isTopic(input.topic) ? input.topic : DEFAULT_TOPIC;

  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10) errors.message = "A few more words, please.";
  if (message.length > 4000) errors.message = "That's a bit long — please trim it.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      phone: (input.phone ?? "").trim() || undefined,
      topic,
      message,
    },
  };
}
