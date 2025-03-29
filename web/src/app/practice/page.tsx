"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { NavBar } from "@/components/nav-bar"
import { CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

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
  const [showDefinition, setShowDefinition] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [textareaHeight, setTextareaHeight] = useState(80)

  const currentCard = mockFlashcards[currentCardIndex]

  useEffect(() => {
    // Reset textarea height when moving to a new card
    setTextareaHeight(80)
  }, [currentCardIndex])

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value)
    // Adjust height based on content
    const newHeight = Math.max(80, Math.min(200, e.target.value.split("\n").length * 24 + 40))
    setTextareaHeight(newHeight)
  }

  const checkAnswer = () => {
    // In a real app, this would use AI to compare the answer
    const isCorrect =
      userAnswer.toLowerCase().includes("energía") ||
      userAnswer.toLowerCase().includes("luz") ||
      userAnswer.toLowerCase().includes("plantas")

    setFeedback({
      correct: isCorrect,
      message: isCorrect
        ? "¡Correcto! Tu respuesta contiene los conceptos clave."
        : "No es del todo correcto. Revisa la definición correcta.",
    })

    setShowDefinition(true)
  }

  const nextCard = () => {
    if (currentCardIndex < mockFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setUserAnswer("")
      setFeedback(null)
      setShowDefinition(false)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <NavBar compact />

        {/* Background wave patterns - same as other pages */}
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
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-gray-800">¡Has completado la práctica!</h2>
              <p className="mb-8 text-gray-600">
                Has repasado todos los conceptos. ¿Quieres crear nuevas flashcards o practicar de nuevo?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/">
                  <Button className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-medium text-white hover:from-blue-600 hover:to-indigo-700">
                    Crear nuevas flashcards
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setCurrentCardIndex(0)
                    setUserAnswer("")
                    setFeedback(null)
                    setShowDefinition(false)
                    setCompleted(false)
                  }}
                  className="rounded-full border-2 border-blue-500 bg-transparent px-6 py-3 font-medium text-blue-600 hover:bg-blue-50"
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

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <NavBar compact />

      {/* Background wave patterns - same as other pages */}
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
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-500">
            Flashcard {currentCardIndex + 1} de {mockFlashcards.length}
          </p>
        </div>

        <div className="w-full max-w-xl">
          {/* Concept Card */}
          <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-lg font-medium text-gray-600">Concepto:</h2>
            <div className="rounded-lg bg-blue-50 p-4">
              <h3 className="text-2xl font-bold text-gray-900">{currentCard.concept}</h3>
            </div>
          </div>

          {/* Answer Section */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-medium text-gray-600">Tu definición:</h2>

            {!showDefinition ? (
              <>
                <Textarea
                  value={userAnswer}
                  onChange={handleTextareaChange}
                  placeholder="Escribe tu definición aquí..."
                  className="mb-4 resize-none rounded-lg border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-300"
                  style={{ height: `${textareaHeight}px` }}
                />
                <Button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-3 font-medium text-white hover:from-blue-600 hover:to-indigo-700"
                >
                  Verificar respuesta
                </Button>
              </>
            ) : (
              <>
                <div
                  className={`mb-6 rounded-lg p-4 ${feedback?.correct ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                >
                  <div className="flex items-start gap-3">
                    {feedback?.correct ? (
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    ) : (
                      <XCircle className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium">{feedback?.correct ? "¡Correcto!" : "Necesitas repasar"}</p>
                      <p className="text-sm">{feedback?.message}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium text-gray-600">Tu respuesta:</h3>
                  <p className="rounded-lg bg-gray-50 p-3 text-gray-800">{userAnswer}</p>
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium text-gray-600">Definición correcta:</h3>
                  <p className="rounded-lg bg-blue-50 p-3 text-gray-800">{currentCard.definition}</p>
                </div>

                <Button
                  onClick={nextCard}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-3 font-medium text-white hover:from-blue-600 hover:to-indigo-700"
                >
                  {currentCardIndex < mockFlashcards.length - 1 ? "Siguiente flashcard" : "Finalizar práctica"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

