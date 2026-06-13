import { siteConfig } from "@/lib/config";

export function StickyNote() {
  return (
    <div className="float-card-1 pointer-events-none absolute top-12 left-6 z-0 hidden w-fit sm:block md:left-16">
      <div
        className="floating-card relative w-44 rounded-lg p-4 leading-snug shadow-md"
        style={{
          background: "#fef08a",
          fontFamily: "var(--font-caveat), cursive",
          fontSize: "15px",
          color: "#374151",
          transform: "rotate(-3deg)",
        }}
      >
        <div
          className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full"
          style={{ background: "#ef4444" }}
        />
        {siteConfig.stickyNote}
      </div>
    </div>
  );
}

export function OpenToWorkBadge() {
  if (!siteConfig.openToWork) return null;

  return (
    <div className="float-card-2 pointer-events-none absolute top-48 left-8 z-0 hidden w-fit lg:block xl:left-24">
      <div className="floating-card flex w-fit items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 shadow-lg">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="shrink-0">
          <p className="text-xs font-bold text-green-800">Open to Work</p>
          <p className="text-xs text-green-600">Full-time · Remote</p>
        </div>
      </div>
    </div>
  );
}
