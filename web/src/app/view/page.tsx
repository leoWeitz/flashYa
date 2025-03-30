"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowLeft, RotateCw } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { useToast } from "@/components/ui/use-toast"
import { getFlashcards } from "@/utils/localstorageUtils"
// Datos de ejemplo - después los reemplazaremos con datos reales
/*const mockFlashcards = [
  {
    id: 1,
    title: "¿Qué es React?",
    content: "React es una biblioteca de JavaScript para construir interfaces de usuario.",
  },
  {
    id: 2,
    title: "¿Qué es Next.js?",
    content:
      "Next.js es un framework de React que permite crear aplicaciones web con renderizado del lado del servidor.",
  },
  {
    id: 3,
    title: "¿Qué es TypeScript?",
    content: "TypeScript es un superconjunto tipado de JavaScript que compila a JavaScript puro.",
  },
  {
    id: 4,
    title: "¿Qué es Tailwind CSS?",
    content: "Tailwind CSS es un framework de CSS utilitario que permite crear diseños rápidamente.",
  },
  {
    id: 5,
    title: "¿Qué es el DOM?",
    content: "El DOM es una representación en memoria de la estructura de un documento HTML.",
  },
  {
    id: 6,
    title: "¿Qué es una API?",
    content:
      "Una API es un conjunto de reglas y protocolos que permiten que diferentes programas se comuniquen entre sí.",
  },
]*/
const mockFlashcards = getFlashcards();

export default function ViewPage() {
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const [animatingCards, setAnimatingCards] = useState<string[]>([])
  const { toast } = useToast()

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
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <NavBar compact />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 pt-24 pb-20">
        <div className="w-full max-w-7xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-2 tracking-tight">Tus Flashcards</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Haz clic en cualquier tarjeta para revelar su contenido. Estudia a tu propio ritmo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {mockFlashcards.map((flashcard) => (
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

