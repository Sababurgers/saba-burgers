"use client";

import { useEffect, useRef, useState } from "react";

interface Category {
  slug: string;
  name: string;
}

export function CartaTabs({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    categories.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [categories]);

  function handleClick(slug: string) {
    setActive(slug);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="bg-paper border-b border-carbon-800/12 sticky top-[68px] z-20" aria-label="Categorías de la carta">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-3.5 flex gap-6 items-center overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleClick(cat.slug)}
            className={`relative font-mono text-[11px] uppercase tracking-[0.18em] py-2 px-3 -mx-3 rounded-md flex-none transition-colors cursor-pointer ${
              active === cat.slug
                ? "text-carbon-800 font-bold"
                : "text-stone hover:text-carbon-800 hover:bg-carbon-800/5"
            }`}
          >
            {cat.name}
            {active === cat.slug && (
              <span className="absolute left-3 right-3 bottom-0 h-0.5 bg-tomato" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
