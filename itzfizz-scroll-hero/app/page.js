import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* just something after the hero so the pin has room to release */}
      <section className="flex min-h-[70vh] items-center justify-center px-6 text-center">
        <div>
          <p className="font-display text-xs tracking-[0.5em] text-papaya">NEXT UP</p>
          <h2 className="mt-4 font-display text-2xl md:text-4xl">Built to move.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/50">
            Everything above runs on transforms only, so scrolling stays smooth
            even on slower phones.
          </p>
        </div>
      </section>
    </main>
  );
}
