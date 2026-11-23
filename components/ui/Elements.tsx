import Link from "next/link";
import { team } from "@/data/team";
import { brandStar } from "@/data/brand";
export function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`star ${className}`}
      viewBox={brandStar.viewBox}
      aria-hidden="true"
    >
      <path
        d={brandStar.path}
        transform={brandStar.transform}
        fill="currentColor"
      />
    </svg>
  );
}
export function Button({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`button magnetic ${light ? "light" : ""}`} href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="tiny-speck" />
      {children}
    </div>
  );
}
export function Closing({
  title = "Got a little something in mind?",
  script = "Let’s make something of it.",
  copy = "Big idea, tiny thought, or something still figuring itself out — we’d love to hear about it.",
  cta = "Start a project",
}: {
  title?: string;
  script?: string;
  copy?: string;
  cta?: string;
}) {
  return (
    <section className="closing section">
      <Eyebrow>A good place to start</Eyebrow>
      <h2 data-reveal>{title}</h2>
      <p className="script">{script}</p>
      <div className="closing-bottom">
        <p>{copy}</p>
        <Button href="/contact/" light>
          {cta}
        </Button>
      </div>
      <Star className="closing-star" />
    </section>
  );
}
export function Team({ full = false }: { full?: boolean }) {
  return (
    <div className={`team-grid ${full ? "full" : ""}`}>
      {team.map((person, i) => (
        <article className="person" key={person.name}>
          <div className="portrait" data-reveal>
            {person.portrait ? (
              <img src={person.portrait} alt={person.name} width={person.width} height={person.height} loading="lazy" />
            ) : (
              <>
                <span className="portrait-letter" aria-hidden="true">
                  {person.name[0]}
                </span>
                <span className="asset-tag">Portrait placeholder</span>
              </>
            )}
            <Star />
          </div>
          <div className="person-caption">
            <h3>{person.name}</h3>
            <span>{person.role} / Speckle Studio</span>
          </div>
          {full && <div className="person-details"><h4>{person.noteTitle}</h4>{person.note.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>}
        </article>
      ))}
    </div>
  );
}
