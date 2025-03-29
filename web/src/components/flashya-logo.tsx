interface FlashyaLogoProps {
  className?: string
}

export function FlashyaLogo({ className = "" }: FlashyaLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-3xl font-black tracking-tighter text-slate-800">FLASH</span>
      <div className="relative">
        <span className="text-3xl font-black tracking-tighter text-blue-500">YÁ</span>
        <span className="absolute -right-1.5 -top-1.5 text-sm font-bold text-blue-400">!</span>
      </div>
      <div className="ml-1 h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
    </div>
  )
}

