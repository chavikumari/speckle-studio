"use client";
import Link from "next/link";
import { navigation, site } from "@/data/site";
import { Star } from "@/components/ui/Elements";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link href="/" aria-label="Speckle Studios home">
          <img
            className="footer-logo"
            src="/brand/wordmark.svg"
            width="430"
            height="112"
            alt="Speckle Studios"
          />
        </Link>
        <nav aria-label="Footer navigation">
          {navigation.map((n) => (
            <Link href={n.href} key={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="footer-socials">
          {site.email ? (
            <a href={`mailto:${site.email}`}>{site.email}</a>
          ) : (
            <Link href="/contact/">A little hello ↗</Link>
          )}
          {site.instagram && <a href={site.instagram}>Instagram ↗</a>}
          {site.behance && <a href={site.behance}>Behance ↗</a>}
          <span className="small">
            {!site.email && "Contact details coming soon"}
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Speckle Studios</span>
        <span>Made with curiosity. XOXO, Speckle Studios.</span>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            })
          }
        >
          Back to top <Star />
        </button>
      </div>
    </footer>
  );
}
