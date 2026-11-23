import Link from "next/link";
import { Star, Button, Eyebrow, Closing, Team } from "@/components/ui/Elements";
import Work from "@/components/home/Work";
import ServicesList from "@/components/home/ServicesList";
import Playground from "@/components/home/Playground";
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-topline">
          <span>SMALL SPECKS. BIG POSSIBILITIES.</span>
          <span>BRAND IDENTITY & BEYOND</span>
        </div>
        <div className="hero-wordmark">
          <h1 className="sr-only">
            Speckle Studios — A studio for ideas taking shape.
          </h1>
          <img
            src="/brand/wordmark.svg"
            alt="Speckle Studios"
            width="1728"
            height="448"
            fetchPriority="high"
          />
          
        </div>
        <div className="hero-bottom">
          <div>
            <span className="hero-label">A STUDIO FOR IDEAS TAKING SHAPE.</span>
            <p>
              We’re an independent design studio making thoughtful identities,
              playful details, and ideas that take shape in the world.
            </p>
          </div>
          <div className="hero-actions">
            <Button href="/work/" light>
              Explore our work
            </Button>
            <Link href="/about/" className="hero-secondary">
              Get to know us <span>↗</span>
            </Link>
          </div>
        </div>
        <div className="hero-foot">
          <span>SCROLL A LITTLE. FIND A LITTLE.</span>
          <span aria-hidden="true">↓</span>
          <Star />
        </div>
      </section>
      <section className="introduction section">
        <Eyebrow>Hello, we’re Speckle</Eyebrow>
        <div className="intro-grid">
          <h2 data-reveal>
            A little thought
            <br />
            goes a <em className="script">long way.</em>
          </h2>
          <div className="intro-copy">
            <Star />
            <p className="lead">
              Different projects,
              <br />
              different forms.
              <br />
              One curious little studio.
            </p>
            <p>
              We look closely, ask questions, and explore the unexpected.
              Because the little things often hold the beginnings of something
              good.
            </p>
            <Link className="text-link" href="/about/">
              A little more about us ↗
            </Link>
          </div>
        </div>
      </section>
      <Work />
      <section className="home-services section">
        <Eyebrow>What we do</Eyebrow>
        <h2 data-reveal>
          Ideas take
          <br />
          <em className="script">different shapes.</em>
        </h2>
        <ServicesList />
        <Button href="/services/">Discover our services</Button>
      </section>
      <section className="meet section">
        <div className="meet-heading">
          <div>
            <Eyebrow>The people behind the specks</Eyebrow>
            <h2 data-reveal>
              Two curious minds.
              <br />
              One <em className="script">little studio.</em>
            </h2>
          </div>
          <p>
            Speckle started with two designers, a shared curiosity, and a love
            for making things that mean something.
          </p>
        </div>
        <Team />
        <div className="meet-bottom">
          <span className="script">Aliza & Chavi</span>
          <Button href="/about/">More about us</Button>
        </div>
      </section>
      <Playground />
      <Closing />
    </main>
  );
}
