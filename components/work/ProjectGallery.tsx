"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ProjectMedia } from "@/data/projects";
import { mediaPath, mediaSize } from "@/data/projects";
import ProjectImage from "./ProjectImage";
export default function ProjectGallery({slug, title, media}: {slug:string;title:string;media:ProjectMedia[]}) {
  const [active,setActive]=useState(0);
  const [expanded,setExpanded]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const openButton=useRef<HTMLButtonElement>(null);
  const touch=useRef<{x:number;y:number}|null>(null);
  const item=media[active];
  const dimensions=mediaSize(slug,item.id);
  const step=(direction:number)=>setActive(i=>(i+direction+media.length)%media.length);
  useEffect(()=>{if(!expanded)return;const before=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=before;};},[expanded]);
  const content=(full:boolean)=>item.type==="video"?<video key={`${full}-${item.id}`} controls playsInline preload="metadata" aria-label={item.alt} src={`/projects/${slug}/${item.id}.mp4`}/> : <ProjectImage key={`${full}-${item.id}`} slug={slug} id={item.id} alt={item.alt} eager sizes={full?"100vw":"90vw"}/>;
  const controls=<div className="gallery-controls"><button onClick={()=>step(-1)} aria-label="Previous slide">Previous</button><span aria-live="polite" aria-atomic="true">{active+1} / {media.length}<span className="sr-only"> — {item.caption}</span></span><button onClick={()=>step(1)} aria-label="Next slide">Next</button></div>;
  function close(){dialog.current?.close();setExpanded(false);openButton.current?.focus();}
  return <section className="project-gallery" aria-label={`${title} image and video gallery`} onKeyDown={e=>{if((e.target as HTMLElement).tagName==="VIDEO")return;if(e.key==="ArrowRight"){e.preventDefault();step(1);}if(e.key==="ArrowLeft"){e.preventDefault();step(-1);}}}>
    <div className="gallery-top"><h2>A closer look.</h2><span>{media.filter(m=>m.type==="image").length} images{media.some(m=>m.type==="video") ? " & a little motion" : ""}</span></div>
    <div className="gallery-stage" style={{"--image-ratio": dimensions.width/dimensions.height} as CSSProperties} onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!touch.current||item.type==="video")return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy))step(dx<0?1:-1);touch.current=null;}}>
      {!expanded && content(false)}
      <button className="gallery-expand" ref={openButton} onClick={()=>{setExpanded(true);dialog.current?.showModal();}}>View full size</button>
    </div>
    <div className="gallery-bottom"><p>{item.caption}</p>{controls}</div>
    <div className="gallery-thumbnails" aria-label="Choose a slide">{media.map((m,i)=><button key={m.id} className={active===i?"active":""} aria-label={`Show ${m.type==="video"?"video":`image ${i+1}`}: ${m.caption}`} aria-pressed={active===i} onClick={()=>setActive(i)}>{m.type==="video"?<span className="video-thumb">Play film</span>:<img src={mediaPath(slug,m.id,480)} alt="" loading="lazy"/>}</button>)}</div>
    <dialog className="gallery-dialog" ref={dialog} onCancel={()=>{setExpanded(false);}} onClose={()=>{setExpanded(false);}} onClick={e=>{if(e.target===e.currentTarget)close();}}>
      <div className="gallery-modal-top"><span>{title} / {item.caption}</span><button autoFocus onClick={close}>Close ×</button></div>
      <div className="gallery-modal-media">{expanded&&content(true)}</div>{controls}
    </dialog>
  </section>;
}
