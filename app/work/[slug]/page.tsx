import Link from "next/link";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { Closing, Eyebrow, Star } from "@/components/ui/Elements";
import ProjectImage from "@/components/work/ProjectImage";
import ProjectGallery from "@/components/work/ProjectGallery";
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.slug===slug);return {title:p?.title||"Project",description:p?.subtitle};}
export default async function CaseStudy({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();
  return <main id="main" className="case-page">
    <section className="case-intro section"><Link href="/work/" className="plain-link">Back to all work</Link><div className="case-title-row"><div><Eyebrow>{p.industry} / A Speckle project</Eyebrow><h1>{p.title}<span className="case-title-star"><Star/></span></h1></div><div><p>{p.subtitle}</p><span className="project-category">{p.scope}</span></div></div></section>
    <div className="case-hero-art"><ProjectImage slug={p.slug} id={p.cover} alt={p.media.find(m=>m.id===p.cover)!.alt} eager/></div>
    <section className="case-overview section"><div><Eyebrow>Behind the idea</Eyebrow><h2>A world of<br/><em className="script">its own.</em></h2></div><div><p className="case-lead">{p.introduction}</p>{p.draft&&<p className="draft-copy-label">Story in progress — the following brief, challenge and approach are draft copy, awaiting the studio’s final project notes.</p>}</div></section>
    <section className="case-narrative section" aria-label="Project story">{[{title:"The brief",text:p.brief},{title:"The challenge",text:p.challenge},{title:"The solution",text:p.solution}].map(s=><article key={s.title}><h3>{s.title}</h3><p>{s.text}</p></article>)}</section>
    <div className="case-image-pair"><figure><ProjectImage slug={p.slug} id={p.detailImages[0]} alt={p.media.find(m=>m.id===p.detailImages[0])!.alt} sizes="(max-width:700px) 100vw, 50vw"/></figure><figure><ProjectImage slug={p.slug} id={p.detailImages[1]} alt={p.media.find(m=>m.id===p.detailImages[1])!.alt} sizes="(max-width:700px) 100vw, 50vw"/></figure></div>
    <section className="case-process section"><div><Eyebrow>How the idea takes shape</Eyebrow><h2>From a spark<br/>to a <em className="script">whole world.</em></h2></div><div className="process-steps">{p.approach.map(a=><article key={a.title}><Star/><div><h3>{a.title}</h3><p>{a.text}</p></div></article>)}</div></section>
    <div className="case-gallery-wrap section"><ProjectGallery slug={p.slug} title={p.title} media={p.media}/></div>
    <section className="case-end section"><span className="script">A little idea, brought to life.</span><Link href="/work/" className="studio-reset">Back to all work</Link></section>
    <Closing title="Your idea. Its own little world." script="Let’s bring it to life."/>
  </main>;
}
