"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "@/components/ui/Elements";
gsap.registerPlugin(ScrollTrigger);
export default function Motion() {
  const path = usePathname();
  const [intro, setIntro] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    try {
      if (
        !sessionStorage.getItem("speckle-visited") &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setIntro(true);
        sessionStorage.setItem("speckle-visited", "1");
        timer = setTimeout(() => setIntro(false), 1150);
      }
    } catch {}
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "main",
          { opacity: 0.45, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, clearProps: "all" },
        );
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
          gsap.fromTo(
            el,
            { y: 32, opacity: 0.35 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
              clearProps: "all",
            },
          ),
        );
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [path]);
  useEffect(() => {
    if (
      !matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)")
        .matches
    )
      return;
    const buttons = document.querySelectorAll<HTMLElement>(".magnetic");
    const cleanups: Array<() => void> = [];
    buttons.forEach((button) => {
      const move = (e: PointerEvent) => {
        const r = button.getBoundingClientRect();
        gsap.to(button, {
          x: (e.clientX - r.left - r.width / 2) * 0.12,
          y: (e.clientY - r.top - r.height / 2) * 0.15,
          duration: 0.3,
          overwrite: true,
        });
      };
      const leave = () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.4 });
      };
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", leave);
        gsap.set(button, { clearProps: "transform" });
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [path]);
  return (
    <>
      {intro && (
        <div className="intro" aria-label="It starts with a speck">
          <Star />
          <p>It starts with a speck!</p>
          <button onClick={() => setIntro(false)}>Skip intro ↗</button>
        </div>
      )}
    </>
  );
}
