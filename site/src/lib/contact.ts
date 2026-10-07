/** Shared contact-form contract (used by the form and the API route). */

export const CONTACT_TOPICS = [
  { value: "general", label: "General inquiry" },
  { value: "shipping", label: "Send me a case of Buttercakes" },
  { value: "wholesale", label: "Wholesale & supply" },
  { value: "visit", label: "Visiting the shop" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export const DEFAULT_TOPIC: ContactTopic = "general";

export function isTopic(value: unknown): value is ContactTopic {
  return CONTACT_TOPICS.some((t) => t.value === value);
}

export function topicLabel(value: string): string {
  return CONTACT_TOPICS.find((t) => t.value === value)?.label ?? "General inquiry";
}

/** Whether the mailing address is a home or a business. */
export type LocationType = "residence" | "business";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: ContactTopic;
  /** Mailing address (all optional). */
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  locationType?: LocationType;
  message?: string;
  /** Honeypot — must be empty. */
  company?: string;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: Partial<ContactPayload>): ValidationResult {
  const errors: Record<string, string> = {};
  const firstName = (input.firstName ?? "").trim();
  const lastName = (input.lastName ?? "").trim();
  const email = (input.email ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const message = (input.message ?? "").trim();
  const topic = isTopic(input.topic) ? input.topic : DEFAULT_TOPIC;
  const locationType =
    input.locationType === "business" || input.locationType === "residence"
      ? input.locationType
      : undefined;

  // Required: first name, last name, email, phone.
  if (firstName.length < 1) errors.firstName = "Please enter your first name.";
  if (lastName.length < 1) errors.lastName = "Please enter your last name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  if (message.length > 4000) errors.message = "That's a bit long — please trim it.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      phone,
      topic,
      street: (input.street ?? "").trim() || undefined,
      city: (input.city ?? "").trim() || undefined,
      state: (input.state ?? "").trim() || undefined,
      zip: (input.zip ?? "").trim() || undefined,
      locationType,
      message: message || undefined,
    },
  };
}
