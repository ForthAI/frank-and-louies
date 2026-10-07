/** Shared contact-form contract (used by the form and the API route). */

export const CONTACT_TOPICS = [
  { value: "shipping", label: "Send me a case of Buttercakes" },
  { value: "wholesale", label: "Wholesale & supply" },
  { value: "visit", label: "Visiting the shop" },
  { value: "general", label: "General inquiry" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export const DEFAULT_TOPIC: ContactTopic = "shipping";

/** Only these topics collect a mailing address. */
export const TOPICS_WITH_ADDRESS: ContactTopic[] = ["shipping", "wholesale"];

/** These topics also collect a business name (required). */
export const TOPICS_WITH_BUSINESS_NAME: ContactTopic[] = ["wholesale"];

/** Only these topics ask whether the address is a business or a residence. */
export const TOPICS_WITH_LOCATION_TYPE: ContactTopic[] = ["shipping"];

export function isTopic(value: unknown): value is ContactTopic {
  return CONTACT_TOPICS.some((t) => t.value === value);
}

/** USPS state / territory codes for the address dropdown. */
export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District of Columbia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "AS", label: "American Samoa" },
  { value: "GU", label: "Guam" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "PR", label: "Puerto Rico" },
  { value: "VI", label: "U.S. Virgin Islands" },
] as const;

const STATE_CODES = new Set(US_STATES.map((s) => s.value as string));
const ZIP_RE = /^\d{5}(-\d{4})?$/;

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
  /** Business name (required for wholesale). */
  businessName?: string;
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
  const businessName = (input.businessName ?? "").trim();
  const state = (input.state ?? "").trim();
  const zip = (input.zip ?? "").trim();
  const locationType =
    input.locationType === "business" || input.locationType === "residence"
      ? input.locationType
      : undefined;

  // Required: first name, last name, email, phone.
  if (firstName.length < 1) errors.firstName = "Please enter your first name.";
  if (lastName.length < 1) errors.lastName = "Please enter your last name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  if (TOPICS_WITH_BUSINESS_NAME.includes(topic) && businessName.length < 1)
    errors.businessName = "Please enter your business name.";
  // Address fields stay optional, but validate the format when they're filled in.
  if (state && !STATE_CODES.has(state)) errors.state = "Please choose a state.";
  if (zip && !ZIP_RE.test(zip)) errors.zip = "Please enter a 5-digit ZIP.";
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
      businessName: businessName || undefined,
      street: (input.street ?? "").trim() || undefined,
      city: (input.city ?? "").trim() || undefined,
      state: state || undefined,
      zip: zip || undefined,
      locationType,
      message: message || undefined,
    },
  };
}
