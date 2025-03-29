"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { NavBar } from "@/components/nav-bar"
import { CheckCircle, XCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { NameCard } from "@/components/ui/nameCard"

// Mock data - in a real app this would come from your database
const mockFlashcards = [
  {
    id: 1,
    concept: "Fotosíntesis",
    definition: "Proceso mediante el cual las plantas convierten la luz solar en energía química.",
  },
  {
    id: 2,
    concept: "Mitocondria",
    definition: "Orgánulo celular responsable de la respiración celular y la producción de ATP.",
  },
  {
    id: 3,
    concept: "ADN",
    definition: "Ácido desoxirribonucleico, molécula que contiene la información genética de los organismos.",
  },
]

export default function PracticePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState<null | { correct: boolean; message: string }>(null)
  const [showingReview, setShowingReview] = useState(false)
  const [completed, setCompleted] = useState(false)

  const currentCard = mockFlashcards[currentCardIndex]

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value)
  }

  const checkAnswer = () => {
    // In a real app, this would use AI to compare the answer
    const isCorrect =
      currentCardIndex === 0
        ? userAnswer.toLowerCase().includes("energía") ||
          userAnswer.toLowerCase().includes("luz") ||
          userAnswer.toLowerCase().includes("plantas")
        : currentCardIndex === 1
          ? userAnswer.toLowerCase().includes("respiración") ||
            userAnswer.toLowerCase().includes("atp") ||
            userAnswer.toLowerCase().includes("celular")
          : userAnswer.toLowerCase().includes("genética") ||
            userAnswer.toLowerCase().includes("información") ||
            userAnswer.toLowerCase().includes("adn")

    const feedbackMessages = [
      {
        correct:
          "¡Excelente! Tu respuesta contiene los conceptos clave sobre la fotosíntesis. Has identificado correctamente que se trata de un proceso donde las plantas utilizan la luz solar para generar energía química.",
        incorrect:
          "Tu respuesta no incluye algunos conceptos clave sobre la fotosíntesis. Recuerda que este proceso involucra la conversión de luz solar en energía química por parte de las plantas.",
      },
      {
        correct:
          "¡Muy bien! Has identificado correctamente que la mitocondria está relacionada con la respiración celular y la producción de ATP, que es la molécula energética fundamental para la célula.",
        incorrect:
          "Tu respuesta no menciona aspectos clave de la mitocondria. Recuerda que este orgánulo es fundamental para la respiración celular y la producción de ATP, que es la energía que utiliza la célula.",
      },
      {
        correct:
          "¡Correcto! Has identificado que el ADN contiene la información genética de los organismos, lo que es esencial para entender cómo se transmiten las características hereditarias.",
        incorrect:
          "Tu respuesta no menciona la función principal del ADN. Recuerda que el ADN es la molécula que contiene toda la información genética que determina las características de un organismo.",
      },
    ]

    setFeedback({
      correct: isCorrect,
      message: isCorrect ? feedbackMessages[currentCardIndex].correct : feedbackMessages[currentCardIndex].incorrect,
    })

    setShowingReview(true)
  }

  const nextCard = () => {
    if (currentCardIndex < mockFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setUserAnswer("")
      setFeedback(null)
      setShowingReview(false)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
        <NavBar compact />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16">
          <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-md border border-slate-100">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-slate-800">¡Has completado la práctica!</h2>
              <p className="mb-8 text-slate-500">
                Has repasado todos los conceptos. ¿Quieres crear nuevas flashcards o practicar de nuevo?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/">
                  <Button className="rounded-full bg-blue-500 hover:bg-blue-600 px-6 py-3 font-medium text-white">
                    Crear nuevas flashcards
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setCurrentCardIndex(0)
                    setUserAnswer("")
                    setFeedback(null)
                    setShowingReview(false)
                    setCompleted(false)
                  }}
                  className="rounded-full border-2 border-blue-500 bg-transparent px-6 py-3 font-medium text-blue-500 hover:bg-blue-50"
                >
                  Practicar de nuevo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (showingReview) {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
        <NavBar compact />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16">
          <div className="w-full max-w-xl">
            {/* User Answer */}
            <div className="mb-6 rounded-xl bg-white p-6 shadow-md border border-slate-100">
              <h2 className="mb-2 text-lg font-medium text-slate-500">Mi respuesta:</h2>
              <p className="rounded-lg bg-slate-50 p-4 text-slate-700">{userAnswer}</p>
            </div>

            {/* Feedback Icon */}
            <div className="mb-6 flex flex-col items-center justify-center py-8">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full ${feedback?.correct ? "bg-green-100" : "bg-red-100"}`}
              >
                {feedback?.correct ? (
                  <CheckCircle className="h-12 w-12 text-green-500" />
                ) : (
                  <XCircle className="h-12 w-12 text-red-500" />
                )}
              </div>
            </div>

            {/* Feedback Text */}
            <div className="mb-6 rounded-xl bg-white p-6 shadow-md border border-slate-100">
              <h2 className="mb-4 text-lg font-medium text-slate-700">
                {feedback?.correct ? "¡Correcto!" : "Necesitas repasar"}
              </h2>
              <p className="text-slate-600 mb-4">{feedback?.message}</p>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <h3 className="mb-2 text-sm font-medium text-slate-500">Definición correcta:</h3>
                <p className="rounded-lg bg-blue-50 p-3 text-slate-700">{currentCard.definition}</p>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <Button
                onClick={nextCard}
                className="rounded-full bg-blue-500 hover:bg-blue-600 px-6 py-2 font-medium text-white flex items-center gap-2"
              >
                {currentCardIndex < mockFlashcards.length - 1 ? "Siguiente flashcard" : "Finalizar práctica"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
      <NavBar compact />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16">
        <div className="mb-4 text-center">
          <p className="text-sm text-slate-500">
            Flashcard {currentCardIndex + 1} de {mockFlashcards.length}
          </p>
        </div>

        <div className="w-full max-w-xl">
          <div className="w-full h-48 flex justify-center items-center mb-6">
            <NameCard concept={currentCard.concept} />
          </div>


          {/* Answer Section */}
          <div className="rounded-xl bg-white p-6 shadow-md border border-slate-100">
            <h2 className="mb-4 text-lg font-medium text-slate-500">Tu definición:</h2>

            <Textarea
              value={userAnswer}
              onChange={handleTextareaChange}
              placeholder="Escribe tu definición aquí..."
              className="mb-4 resize-none rounded-lg border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 min-h-[120px]"
            />
            <Button
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 py-3 font-medium text-white"
            >
              Verificar respuesta
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

