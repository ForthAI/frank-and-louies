export type NavLink = { label: string; href: string };

/** One-page site — nav links are in-page anchors. */
export const navLinks: NavLink[] = [
  { label: "Our Story", href: "#story" },
  { label: "Products", href: "#products" },
  { label: "Visit", href: "#visit" },
  { label: "Contact", href: "#contact" },
];

export const footerLinks: NavLink[] = [
  { label: "Our Story", href: "#story" },
  { label: "Products", href: "#products" },
  { label: "Visit Us", href: "#visit" },
  { label: "Ship a Case", href: "#contact" },
  { label: "Contact", href: "#contact" },
];
