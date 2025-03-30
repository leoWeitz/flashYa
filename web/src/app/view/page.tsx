"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowLeft, RotateCw } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { useToast } from "@/components/ui/use-toast"
import { getFlashcards } from "@/utils/localstorageUtils"
import { Flashcard } from "@/utils/localstorageUtils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"

export default function ViewPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const [animatingCards, setAnimatingCards] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const loadedFlashcards = getFlashcards()
    setFlashcards(loadedFlashcards)
  }, [])

  const toggleCard = (id: string) => {
    // Si la tarjeta ya está en animación, no hacer nada
    if (animatingCards.includes(id)) return

    // Marcar la tarjeta como en animación
    setAnimatingCards((prev) => [...prev, id])

    // Cambiar el estado de volteado
    setFlippedCards((prev) => (prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]))

    // Quitar la tarjeta de animación después de que termine
    setTimeout(() => {
      setAnimatingCards((prev) => prev.filter((cardId) => cardId !== id))
    }, 700) // Debe coincidir con la duración de la animación
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <NavBar compact />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 pt-24 pb-20">
        <div className="w-full max-w-7xl">
          <div className="mb-10">
            <div className="relative">
              <h1 className="text-4xl font-bold text-slate-800 tracking-tight text-center">Tus Flashcards</h1>
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Link href="/practice">
                  <Button className="gap-2 bg-blue-500 hover:bg-blue-600 text-white">
                    <Brain className="h-4 w-4" />
                    <span>Practicar</span>
                  </Button>
                </Link>
              </div>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto text-center mt-2">
              Haz clic en cualquier tarjeta para revelar su contenido. Estudia a tu propio ritmo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {flashcards.map((flashcard) => (
              <div
                key={flashcard.concept}
                className="group perspective h-72 sm:h-80"
                onClick={() => toggleCard(flashcard.concept)}
              >
                <div
                  className={cn(
                    "relative h-full w-full transition-all duration-700 transform-style-3d cursor-pointer",
                    flippedCards.includes(flashcard.concept) && "rotate-y-180",
                  )}
                >
                  {/* Frente de la tarjeta */}
                  <div className="absolute inset-0 backface-hidden">
                    <Card className="h-full w-full flex flex-col items-center justify-center p-8 bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(59,130,246,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.15)] transition-all duration-300 card-shine">
                      <div className="absolute top-4 right-4 text-blue-400/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        <RotateCw className="h-5 w-5" />
                      </div>
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-6"></div>
                      <h3 className="text-2xl font-bold text-slate-800 text-center">{flashcard.concept}</h3>
                      <div className="mt-6 text-sm text-blue-500 font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Clic para ver respuesta</span>
                      </div>
                    </Card>
                  </div>

                  {/* Reverso de la tarjeta */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <Card className="h-full w-full flex flex-col p-8 bg-gradient-to-br from-blue-500 to-indigo-600 border-0 shadow-[0_10px_40px_-15px_rgba(59,130,246,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.25)] transition-all duration-300">
                      <h3 className="text-sm font-medium text-white/90 text-center mb-4 pb-3 border-b border-white/10">
                        {flashcard.concept}
                      </h3>
                      <div className="flex-1 flex items-center justify-center overflow-auto">
                        <p className="text-white text-center text-lg leading-relaxed">{flashcard.definition}</p>
                      </div>
                      <button
                        className="flex items-center justify-center text-white/80 mt-4 py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors group/btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCard(flashcard.concept)
                        }}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover/btn:-translate-x-1" />
                        <span className="text-sm">Volver</span>
                      </button>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

