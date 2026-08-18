import Link from "next/link";

export default function BottomBar() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[48px] bg-brand-yellow flex items-center justify-between px-6 z-50">
      <span className="text-brand-blue font-bold text-sm uppercase tracking-wider">
        Project Collection
      </span>
      <Link
        className="group hidden items-center gap-2 border-2 border-brand-blue bg-paper px-4 py-2 font-mono text-xs font-black uppercase tracking-widest text-brand-blue shadow-[3px_3px_0_#238CFF] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue md:inline-flex"
        href="/showcase"
      >
        Explore all work
        <svg
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 12h14M14 7l5 5-5 5"
            stroke="currentColor"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="2"
          />
        </svg>
      </Link>
    </div>
  );
}
