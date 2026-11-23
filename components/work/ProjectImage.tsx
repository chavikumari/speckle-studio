import { mediaPath, mediaSize } from "@/data/projects";
export default function ProjectImage({ slug, id, alt, className, eager = false, sizes = "100vw" }: { slug: string; id: number; alt: string; className?: string; eager?: boolean; sizes?: string }) {
  const dimensions=mediaSize(slug,id);
  const variants=[480,960,1920].filter((w,i,all)=>i===0 || Math.min(w,dimensions.width)!==Math.min(all[i-1],dimensions.width));
  return <img className={className} src={mediaPath(slug,id)} srcSet={variants.map(w=>`${mediaPath(slug,id,w)} ${Math.min(w,dimensions.width)}w`).join(", ")} sizes={sizes} width={dimensions.width} height={dimensions.height} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" fetchPriority={eager ? "high" : "auto"} />;
}
