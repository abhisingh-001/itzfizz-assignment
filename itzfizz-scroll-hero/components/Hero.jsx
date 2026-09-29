"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Car from "./Car";
import StatCard from "./StatCard";
import { stats } from "@/data/stats";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZFIZZ";
const DASH_PERIOD = 120; // has to match the gradient in globals.css

export default function Hero() {
  const root = useRef(null);
  const car = useRef(null);
  const dashes = useRef(null);
  const speedo = useRef(null);
  const progressBar = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;

    if (reduceMotion) {
      // no motion: show everything and park the car in the middle
      el.removeAttribute("data-intro");
      gsap.set(car.current, { x: window.innerWidth / 2 - car.current.offsetWidth / 2 });
      return;
    }

    // --- smooth scrolling, wired into GSAP's ticker ---
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // --- page load animation (runs once) ---
    const intro = gsap.context(() => {
      gsap.set(".letter", { y: 40 });
      gsap.set(".stat-card", { y: 28 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".letter", { opacity: 1, y: 0, duration: 0.9, stagger: 0.06 })
        .to(".stat-card", { opacity: 1, y: 0, duration: 0.8, stagger: 0.18 }, "-=0.4")
        .to(".hud", { opacity: 1, duration: 0.6 }, "-=0.5");

      // numbers count up as each card shows up
      el.querySelectorAll("[data-count]").forEach((node, i) => {
        const target = Number(node.dataset.count);
        const counter = { n: 0 };
        gsap.to(counter, {
          n: target,
          duration: 1.4,
          delay: 1.1 + i * 0.18,
          ease: "power2.out",
          onStart: () => (node.textContent = "0"),
          onUpdate: () => (node.textContent = Math.round(counter.n)),
        });
      });
    }, el);

    // --- scroll animation (rebuilt on resize since it depends on pixel widths) ---
    let scrollCtx;

    const buildScroll = () => {
      scrollCtx?.revert();

      scrollCtx = gsap.context(() => {
        const vw = window.innerWidth;
        const carW = car.current.offsetWidth;
        const travel = vw + carW;
        const letters = gsap.utils.toArray(".letter");

        gsap.set(car.current, { x: -carW });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: `+=${Math.round(vw * 1.6)}`,
            pin: true,
            scrub: 1.2, // the little lag is what makes it feel smooth
            onUpdate: (self) => {
              const p = self.progress;
              speedo.current.textContent = Math.round(Math.sin(p * Math.PI) * 312);
              progressBar.current.style.transform = `scaleX(${p})`;
            },
          },
        });

        // car crosses the whole screen
        tl.to(car.current, { x: vw, duration: 1 }, 0);

        // tiny body roll so it doesn't look glued to a rail
        tl.to(
          car.current,
          {
            keyframes: [
              { rotation: -1.8, duration: 0.3 },
              { rotation: 1.8, duration: 0.4 },
              { rotation: 0, duration: 0.3 },
            ],
          },
          0
        );

        // road markings rush backwards
        tl.to(dashes.current, { x: -DASH_PERIOD * 8, duration: 1 }, 0);

        // light each letter up right when the middle of the car goes over it
        letters.forEach((letter) => {
          const box = letter.getBoundingClientRect();
          const centre = box.left + box.width / 2;
          const at = Math.min(Math.max((centre + carW / 2) / travel, 0), 0.97);

          tl.to(
            letter,
            {
              color: "#ff5a1f",
              scale: 1.12,
              textShadow: "0 0 22px rgba(255,90,31,0.55)",
              duration: 0.04,
            },
            at
          );
        });
      }, el);
    };

    buildScroll();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildScroll();
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      scrollCtx?.revert();
      intro.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={root}
      data-intro
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,90,31,0.12),transparent_60%)]" />

      {/* top bar */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-12">
        <span className="font-display text-xs font-bold tracking-[0.35em]">ITZFIZZ</span>
        <div className="hud flex items-baseline gap-2">
          <span ref={speedo} className="font-display text-xl tabular-nums md:text-2xl">
            0
          </span>
          <span className="text-[10px] tracking-widest text-white/40">KM/H</span>
        </div>
      </header>

      {/* road */}
      <div className="absolute inset-x-0 top-1/2 h-[170px] -translate-y-[62%] border-y border-white/10 bg-asphalt md:h-[230px]">
        <div
          ref={dashes}
          className="road-dashes absolute left-0 top-1/2 h-[3px] w-[calc(100%+1200px)] -translate-y-1/2"
        />
      </div>

      {/* headline sits on the road, the car drives over it */}
      <h1
        aria-label="Welcome Itzfizz"
        className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-[62%] items-center justify-center gap-[0.4em] font-display text-[clamp(1rem,3.7vw,3.4rem)] font-bold"
      >
        {HEADLINE.split("").map((char, i) =>
          char === " " ? (
            <span key={i} className="w-[0.8em]" aria-hidden="true" />
          ) : (
            <span key={i} className="letter" aria-hidden="true">
              {char}
            </span>
          )
        )}
      </h1>

      {/* car + headlight beam */}
      <div
        ref={car}
        className="absolute left-0 top-1/2 z-20 h-[74px] w-[176px] -translate-y-[62%] will-change-transform md:h-[112px] md:w-[276px]"
      >
        <div className="beam pointer-events-none absolute left-[96%] top-1/2 h-[200%] w-[55vw] -translate-y-1/2" />
        <Car />
      </div>

      {/* stats */}
      <div className="absolute inset-x-0 bottom-[7vh] z-10 grid grid-cols-2 gap-x-6 gap-y-8 px-6 md:grid-cols-4 md:px-12">
        {stats.map((s) => (
          <StatCard key={s.label + s.value} {...s} />
        ))}
      </div>

      {/* scroll progress */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <div
          ref={progressBar}
          className="h-full origin-left scale-x-0 bg-papaya will-change-transform"
        />
      </div>
    </section>
  );
}
