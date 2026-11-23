import type { Metadata } from "next";
import { services, process } from "@/data/services";
import { Star, Eyebrow, Closing } from "@/components/ui/Elements";
export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand identity, packaging, print, editorial and creative direction. Thoughtful design from the first little idea to the final detail.",
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Ideas take different shapes — Speckle Studios",
    url: "/services/",
  },
};
export default function Services() {
  return (
    <main id="main">
      <section className="inner-hero services-hero section">
        <Eyebrow>02 / What we do</Eyebrow>
        <h1 data-reveal>
          What we do,
          <br />
          and <em className="script">how we do it.</em>
        </h1>
        <div className="hero-aside">
          <Star />
          <p className="lead">
            From the first little idea to the final detail, we help ideas find
            their form.
          </p>
        </div>
      </section>
      <div className="expertise">
        {services.map((s, i) => (
          <section
            className={`expertise-section section expertise-${i}`}
            id={s.id}
            key={s.id}
          >
            <div className="expertise-title">
              <span className="giant-number">0{i + 1}</span>
              <h2 data-reveal>{s.short}</h2>
              <Star />
            </div>
            <div className="expertise-content">
              <p className="lead">{s.description}</p>
              <h3 className="eyebrow">The shapes it could take</h3>
              <ul>
                {s.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {s.provisional && (
                <p className="small">
                  A starting point — we’ll confirm the scope together.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
      <section className="process section">
        <Eyebrow>How we get there</Eyebrow>
        <h2 data-reveal>
          A little method
          <br />
          to the <em className="script">madness.</em>
        </h2>
        <div className="process-steps">
          {process.map(([name, desc], i) => (
            <details key={name} open={i === 0}>
              <summary>
                <span>0{i + 1}</span>
                <h3>{name}</h3>
                <span className="process-plus">+</span>
              </summary>
              <p>{desc}</p>
            </details>
          ))}
        </div>
      </section>
      <Closing
        title="Every great project starts somewhere."
        script="A little idea will do."
        copy="Tell us a little about what you’re building."
        cta="Let’s talk about your project"
      />
    </main>
  );
}
