import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_ITEMS = [
  { value: "500+", label: "Verified makers" },
  { value: "BIS", label: "Hallmarked only" },
  { value: "7-day", label: "Easy returns" },
];

function CornerBracket({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 9V1H9"
        stroke="#C9A961"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function GemCard({ className, tone = "ink" }) {
  const bg = tone === "gold" ? "bg-[#C9A961]/15" : "bg-[#1C1917]";
  return (
    <div className={`relative ${className}`}>
      <div
        className={`h-full w-full rounded-sm border border-[#C9A961]/20 ${bg}`}
      />
      <CornerBracket className="absolute -top-px -left-px h-4 w-4" />
      <CornerBracket className="absolute -top-px -right-px h-4 w-4 rotate-90" />
      <CornerBracket className="absolute -bottom-px -left-px h-4 w-4 -rotate-90" />
      <CornerBracket className="absolute -bottom-px -right-px h-4 w-4 rotate-180" />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative bg-[#12100E] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-10 items-center">
          {/* Left column */}
          <div>
            <span
              className="inline-block text-[11px] tracking-[0.2em] text-[#C9A961] mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              A MULTI-VENDOR JEWELRY HOUSE
            </span>

            <h1
              className="text-[#F5F1E8] text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every piece, traced
              <br />
              back to the{" "}
              <span className="italic text-[#C9A961]">hands</span>
              <br />
              that made it.
            </h1>

            <p className="text-[#8A8478] text-base sm:text-lg max-w-md mb-10 leading-relaxed">
              Shop rings, chains, and gemstones from independent jewellers
              across India. Each maker verified, each piece hallmarked, no
              middlemen in between.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-[#C9A961] text-[#12100E] hover:bg-[#E4C989] rounded-sm px-6"
                asChild
              >
                <Link href="/products">
                  Shop the edit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#C9A961]/40 text-[#F5F1E8] hover:bg-[#C9A961]/10 hover:border-[#C9A961] rounded-sm px-6"
                asChild
              >
                <Link href="/vendors">Meet the makers</Link>
              </Button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {TRUST_ITEMS.map((item, i) => (
                <div key={item.label} className="flex items-center gap-8">
                  <div>
                    <p
                      className="text-[#F5F1E8] text-lg"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.value}
                    </p>
                    <p className="text-[#8A8478] text-xs mt-0.5">
                      {item.label}
                    </p>
                  </div>
                  {i < TRUST_ITEMS.length - 1 && (
                    <span className="hidden sm:block h-8 w-px bg-[#C9A961]/15" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — layered gem cards standing in for product photography */}
          <div className="relative h-[420px] sm:h-[480px] lg:h-[520px]">
            <GemCard className="absolute top-0 right-0 h-[62%] w-[70%]" />
            <GemCard
              className="absolute bottom-0 left-0 h-[55%] w-[60%]"
              tone="gold"
            />
            {/*
              Replace GemCard placeholders with next/image product photography, e.g.:
              <Image src="/hero/ring.jpg" alt="" fill className="object-cover" />
              Keep the CornerBracket overlay for the hallmark-card signature look.
            */}
          </div>
        </div>
      </div>
    </section>
  );
}