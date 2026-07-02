"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { navLinks } from "@/content/nav";
import { Logo } from "@/components/brand/Logo";
import { Cta } from "@/components/brand/Cta";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-blush-deep/60 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75"
          : "bg-transparent",
      )}
    >
      <div className="container-fl relative flex h-20 items-center justify-between gap-4">
        {/* Left — menu button (opens the full nav) */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-blush"
          >
            <Menu className="size-6" aria-hidden />
            <span className="hidden sm:inline">Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 max-w-[85vw] bg-cream p-0">
            <SheetHeader className="border-b border-blush-deep/60 px-6 pt-6 pb-4">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo height={48} href={null} />
            </SheetHeader>
            <nav aria-label="Primary" className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-xl px-4 py-3 text-lg font-semibold text-charcoal transition-colors hover:bg-blush"
                    >
                      {link.label}
                    </Link>
                  }
                />
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-blush-deep/60 px-6 py-6">
              <SheetClose
                nativeButton={false}
                render={
                  <Cta href="#visit" size="md" className="w-full">
                    Visit Us
                  </Cta>
                }
              />
            </div>
          </SheetContent>
        </Sheet>

        {/*
          Center — logo. Large at the top of the page (overflows down onto the
          hero), shrinks to compact on scroll. Absolutely centered so the intro
          badge can fly straight up into it. data-nav-logo lets the intro read
          its position for a precise handoff.
        */}
        <div
          data-nav-logo
          className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2"
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="pointer-events-auto block w-max"
          >
            <Image
              src="/brand/logo.svg"
              alt={`${siteConfig.legalName} logo`}
              width={139}
              height={151}
              priority
              className="h-24 w-auto origin-top select-none drop-shadow-[0_8px_18px_rgba(0,0,0,0.12)] lg:h-28"
            />
          </Link>
        </div>

        {/* Right — fast path to Visit */}
        <Cta href="#visit" size="sm">
          Visit Us
        </Cta>
      </div>
    </header>
  );
}
