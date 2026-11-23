import type { Metadata } from "next";
import { Star, Eyebrow, Closing } from "@/components/ui/Elements";
import { site } from "@/data/site";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About us",
  description: "Meet Aliza & Chavi, the two curious minds behind Speckle Studios.",
  alternates: { canonical: "/about/" },
  openGraph: { title: "A little more about us — Speckle Studios", description: site.description, url: "/about/" },
};

const inspirations = [
  {id:"ceramics", title:"Ceramics & pottery", lead:"Clay, glaze, colour, and fire.", copy:"We're fascinated by how a simple material becomes an object with a story, full of character and little imperfections.", credit:"Pieces by Luzeceramics", alt:"Speckled ceramic cups and bowls by Luzeceramics"},
  {id:"music", title:"Music", lead:"Yes, music is life.", copy:"A little cliché, perhaps, but what would the world be without songs and sounds that make us feel something? Music finds its way into how we think, feel, and make.", credit:"Still from the short film Routine", alt:"A person listening to music in warm window light, from Routine"},
  {id:"people", title:"People", lead:"People are walking collections of ideas, emotions, and contradictions.", copy:"From what they wear to what they believe, every person is a universe of their own.", credit:"Brandonstaniford on Instagram", alt:"Illustration of people walking in different directions by Brandonstaniford"},
  {id:"culture", title:"Culture", lead:"History, art, symbols, and everyday rituals – cultures hold countless stories waiting to be discovered.", copy:"We're fascinated by how they evolve, overlap, and take on new forms.", credit:"A diagram by Dave Gray", alt:"Dave Gray's Culture and Cult diagram with overlapping and aligned circles"},
];

export default function About() {
  return <main id="main">
    <section className="inner-hero about-hero section">
      <Eyebrow>01 / The studio</Eyebrow>
      <h1 data-reveal>A little more<br/><em className="script">about us.</em></h1>
      <div className="hero-aside"><Star/><p className="lead">{site.description}</p></div>
    </section>
    <section className="founder-notes section" aria-labelledby="founders-title">
      <Eyebrow>The people behind Speckle</Eyebrow>
      <h2 id="founders-title">Aliza &amp; Chavi.<br/><em className="script">Two minds. One little studio.</em></h2>
      {team.map(person=><article className="founder-note" key={person.name}>
        <figure className="founder-photo">
          <img src={person.portrait} width={person.width} height={person.height} alt={`${person.name}, ${person.role}, Speckle Studio`} loading="lazy"/>
          <figcaption><span className="script">{person.name}</span><span>{person.role}<br/>Speckle Studio</span></figcaption>
        </figure>
        <div className="founder-letter">
          <h3>{person.noteTitle}</h3>
          {person.note.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
          <p className="founder-signature script">{person.name}</p>
          <p className="founder-role">{person.role}, Speckle Studio</p>
        </div>
      </article>)}
    </section>
    <section className="inspiration-reference section" aria-labelledby="inspirations-title">
      <h2 id="inspirations-title">A few things we steal from!</h2>
      <div className="inspiration-reference-grid">{inspirations.map(item=><article key={item.id}>
        <figure><img src={`/about/${item.id}.webp`} width="637" height="591" alt={item.alt} loading="lazy"/><figcaption>{item.credit}</figcaption></figure>
        <div className="inspiration-copy"><h3>{item.title}</h3><p className="inspiration-lead">{item.lead}</p><p>{item.copy}</p></div>
      </article>)}</div>
    </section>
    <Closing title="There’s always more to find." script="That’s part of the fun." copy="Our studio will grow, our work will change, and new ideas will find forms we haven’t thought of yet." cta="Let’s work together"/>
  </main>;
}
