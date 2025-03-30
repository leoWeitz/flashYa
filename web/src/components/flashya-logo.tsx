interface FlashyaLogoProps {
  className?: string;
}

export function FlashyaLogo({ className = "" }: FlashyaLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Lightning bolt icon */}
      <div className="mr-1.5 text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transform rotate-12"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>

      {/* Text part */}
      <div className="flex items-baseline">
        <span className="text-2xl font-extrabold tracking-tight text-slate-800">
          FLASH
        </span>
        <div className="relative">
          <span className="text-2xl font-extrabold tracking-tight text-blue-500">
            YÁ
          </span>
          <span className="absolute -right-1 -top-1 text-xs font-bold text-blue-400">
            !
          </span>
        </div>
      </div>

      {/* Decorative element */}
      <div className="relative ml-1.5">
        <div className="h-0.5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        <div className="mt-1 h-0.5 w-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      </div>
    </div>
  );
}
