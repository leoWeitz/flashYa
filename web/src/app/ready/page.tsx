import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { LightbulbIcon } from "lucide-react"

export default function ReadyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <NavBar compact />

      {/* Background wave patterns - same as home page */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-full w-1/2 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 top-0 h-full w-full transform rounded-br-[70%] rounded-tr-[30%]"
              style={{
                backgroundColor: `#${i % 2 === 0 ? "d7d7d7" : "c0c0c0"}`,
                left: `${i * 40}px`,
                opacity: 0.7 - i * 0.1,
              }}
            />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute right-0 top-0 h-full w-full transform rounded-bl-[70%] rounded-tl-[30%]"
              style={{
                backgroundColor: `#${i % 2 === 0 ? "d7d7d7" : "c0c0c0"}`,
                right: `${i * 40}px`,
                opacity: 0.7 - i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16">
        <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <LightbulbIcon className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-800">¡Tus flashcards están listas!</h2>
            <p className="mb-8 text-gray-600">
              Hemos generado flashcards basadas en tu contenido. ¿Estás listo para comenzar a practicar?
            </p>
            <Link href="/practice">
              <Button className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 font-medium text-white hover:from-blue-600 hover:to-indigo-700">
                ¡Estoy listo!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

