import Link from "next/link"
import { FlashyaLogo } from "./flashya-logo"

interface NavBarProps {
  compact?: boolean
}

export function NavBar({ compact = false }: NavBarProps) {
  return (
    <header className={`fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-sm ${compact ? "py-2" : "py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <FlashyaLogo className={compact ? "h-8 w-auto" : "h-10 w-auto"} />
        </Link>
      </div>
    </header>
  )
}

