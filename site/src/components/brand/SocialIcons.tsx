/** Brand glyphs (lucide dropped its brand icons). currentColor-driven. */

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M14 9.5V7.8c0-.8.2-1.3 1.4-1.3H17V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v1.8H8v3h2.6V21h3.2v-8.5H16l.4-3H14Z" />
    </svg>
  );
}
