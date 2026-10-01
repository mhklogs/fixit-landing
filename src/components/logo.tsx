export default function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[64%] w-[64%]">
        {/* house gable = roof of a home across trades */}
        <path
          d="M12 3 2.6 11h2.4v9h14v-9h2.4L12 3Z"
          fill="currentColor"
        />
        {/* door */}
        <path d="M9.5 20v-5h5v5" fill="rgba(0,0,0,0.25)" />
        {/* wrench diagonals across the gable — plumbing/HVAC/handyman */}
        <g stroke="#0C2255" strokeWidth="1.15" strokeLinecap="round" fill="none">
          <path d="M7.4 7.2h5.6" />
          <path d="M10.2 4.6v5.2" />
        </g>
        {/* plug prongs — electrical */}
        <g fill="#0C2255">
          <rect x="12.6" y="9.6" width="0.9" height="2.6" rx="0.3" />
          <rect x="14.9" y="9.6" width="0.9" height="2.6" rx="0.3" />
          <rect x="13.1" y="11.6" width="2.2" height="0.8" rx="0.35" />
        </g>
        {/* droplet — plumbing */}
        <path
          d="m16.4 7.2 2 3.4a1.5 1.5 0 0 1-2.6 1.5l-1.6-2.7"
          stroke="#0C2255"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}