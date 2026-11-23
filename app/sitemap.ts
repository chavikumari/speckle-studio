export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "work/",
    "about/",
    "services/",
    "contact/",
    ...projects
      
      .map((p) => "work/" + p.slug + "/"),
  ].map((path) => ({ url: site.url + "/" + path }));
}
