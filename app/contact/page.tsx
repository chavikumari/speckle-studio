import type { Metadata } from "next";
import { Star, Eyebrow } from "@/components/ui/Elements";
import InquiryForm from "@/components/contact/InquiryForm";
import { site } from "@/data/site";
export const metadata: Metadata = {
  title: "Say hello",
  description:
    "Have a little idea? Tell Speckle Studios what you have in mind.",
  alternates: { canonical: "/contact/" },
  openGraph: { title: "Say hello! — Speckle Studios", url: "/contact/" },
};
export default function Contact() {
  return (
    <main id="main">
      <section className="contact-hero section">
        <Eyebrow>03 / Something good starts here</Eyebrow>
        <h1 className="script" data-reveal>
          Say hello!
        </h1>
        <Star />
        <div className="contact-intro">
          <h2>
            Have a little idea?
            <br />
            We’d love to hear it.
          </h2>
          <p>
            Whether you’ve got a clear vision or just the beginnings of
            something interesting, tell us about it.
          </p>
        </div>
      </section>
      <section className="inquiry section">
        <aside>
          <Eyebrow>A few little details</Eyebrow>
          <p>
            Nothing needs to be
            <br />
            perfectly figured out.
          </p>
          <span className="script">That’s what we’re here for.</span>
          <div className="contact-links">
            <h2>Other ways to say hello</h2>
            {site.email ? (
              <a href={`mailto:${site.email}`}>{site.email} ↗</a>
            ) : (
              <p className="small">Our studio email will be added here soon.</p>
            )}
            {site.instagram && <a href={site.instagram}>Instagram ↗</a>}
            {site.behance && <a href={site.behance}>Behance ↗</a>}
          </div>
        </aside>
        <InquiryForm />
      </section>
      <section className="small-ending">
        <Star />
        <h2>
          Something good
          <br />
          <em className="script">starts small.</em>
        </h2>
      </section>
    </main>
  );
}
