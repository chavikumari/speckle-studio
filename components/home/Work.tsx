import Link from "next/link";
import { projects } from "@/data/projects";
import { Eyebrow } from "@/components/ui/Elements";
import ProjectImage from "@/components/work/ProjectImage";
export default function Work() {
  const project = projects[0];
  return <section className="work section home-real-work" id="work">
    <div className="section-heading"><Eyebrow>Selected work</Eyebrow><Link className="plain-link" href="/work/">View all work</Link></div>
    <div className="featured-work-heading"><h2 data-reveal>Ideas you can<br/><em className="script">hold on to.</em></h2><p>Meet the worlds we’ve been making.<br/>Thoughtfully built. Full of personality.</p></div>
    <Link className="home-project-feature" href={`/work/${project.slug}/`}>
      <ProjectImage slug={project.slug} id={project.cover} alt={project.media.find(m=>m.id===project.cover)!.alt}/>
      <span className="feature-open">Explore Candie</span>
    </Link>
    <div className="project-caption"><h3>{project.title}</h3><span>{project.scope}</span></div>
    <nav className="home-project-links" aria-label="More projects">{projects.slice(1).map(p=><Link key={p.slug} href={`/work/${p.slug}/`}>{p.title}</Link>)}</nav>
  </section>;
}
