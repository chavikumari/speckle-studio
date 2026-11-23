"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
export default function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = panel.current?.querySelectorAll<HTMLAnchorElement>("a");
    links?.[0]?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab" && links) {
        const first = links[0],
          last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          trigger.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          trigger.current?.focus();
        } else if (document.activeElement === trigger.current) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <header className="header">
      <Link href="/" className="nav-brand" aria-label="Speckle Studios home">
        <img src="/brand/logomark.svg" width="66" height="40" alt="" />
        <span className="nav-studio-name">Speckle Studios</span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        {navigation.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            aria-current={(path === n.href || (n.href === "/work/" && path.startsWith("/work"))) ? "page" : undefined}
            className={n.label === "Contact" ? "nav-contact" : ""}
          >
            {n.label}
            {n.label === "Contact" && <span aria-hidden="true">↗</span>}
          </Link>
        ))}
      </nav>
      <button
        className="menu-toggle"
        ref={trigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        {open ? "Close −" : "Menu +"}
      </button>
      {open && (
        <div
          ref={panel}
          className="mobile-nav"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <nav>
            {navigation.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => {
                  setOpen(false);
                  trigger.current?.focus();
                }}
              >
                <small>0{i + 1}</small>
                {n.label}
                <span>↗</span>
              </Link>
            ))}
          </nav>
          <p>Made with curiosity. Always.</p>
        </div>
      )}
    </header>
  );
}
