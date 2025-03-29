// import Link from "next/link"
// import { FlashyaLogo } from "./flashya-logo"
// import { ChevronDown } from "lucide-react"

// interface NavBarProps {
//   compact?: boolean
// }

// export function NavBar({ compact = false }: NavBarProps) {
//   return (
//     <header
//       className={`fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm ${compact ? "py-2" : "py-4"}`}
//     >
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//         <Link href="/" className="flex items-center">
//           <FlashyaLogo className={compact ? "h-8 w-auto" : "h-10 w-auto"} />
//           <ChevronDown className="ml-1 h-4 w-4 text-slate-400" />
//         </Link>
//       </div>
//     </header>
//   )
// }

// "use client"

// import Link from "next/link"

// export const NavBar = ({ compact }: { compact?: boolean }) => {
//   return (
//     <div className="border-b">
//       <div className="flex h-16 items-center px-4">
//         <Link className="font-semibold" href="/">
//           Flashcards
//         </Link>
//       </div>
//     </div>
//   )
// }

import Link from "next/link"
import { FlashyaLogo } from "./flashya-logo"
import { ChevronDown } from "lucide-react"

interface NavBarProps {
  compact?: boolean
}

export function NavBar({ compact = false }: NavBarProps) {
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm ${compact ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <FlashyaLogo className={compact ? "h-8 w-auto" : "h-10 w-auto"} />
          <ChevronDown className="ml-1 h-4 w-4 text-slate-400" />
        </Link>
      </div>
    </header>
  )
}
