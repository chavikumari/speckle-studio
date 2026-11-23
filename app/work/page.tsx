import Link from "next/link";
import { projects } from "@/data/projects";
import { Closing, Eyebrow } from "@/components/ui/Elements";
import ProjectImage from "@/components/work/ProjectImage";
export const metadata = {title:"Our work",description:"A selection of identities, packaging and illustrated worlds by Speckle Studios."};
export default function WorkPage(){return <main id="main" className="work-page simple-work">
  <section className="work-introduction section"><div><Eyebrow>Speckle Studios / Selected work</Eyebrow><h1>Our <em className="script">work.</em></h1></div><p>Thoughtful identities.<br/>Packaging with personality.<br/>Little ideas, brought to life.</p></section>
  <section className="work-projects section" id="projects" aria-label="Portfolio projects"><div className="work-index-header"><span>{projects.length} projects</span><span>Identity / Packaging / Illustration</span></div><div className="project-masonry">{projects.map((p,i)=><article key={p.slug} className={`work-project-card ${i===0?"featured-project":""}`}><Link href={`/work/${p.slug}/`} className="work-project-art" aria-label={`View ${p.title} project`}><ProjectImage slug={p.slug} id={p.cover} alt={p.media.find(m=>m.id===p.cover)!.alt} eager={i===0} sizes={i===0?"90vw":"(max-width:700px) 90vw, 45vw"}/><span className="work-card-open">View project</span></Link><div className="work-card-description"><span className="project-category">{p.industry}</span><h2><Link href={`/work/${p.slug}/`}>{p.title}</Link></h2><p>{p.scope}</p></div></article>)}</div></section>
  <Closing/>
 </main>}
