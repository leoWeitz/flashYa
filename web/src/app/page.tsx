"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { useState } from "react"

export default function Home() {
  const [content, setContent] = useState("")

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <NavBar />

      {/* Background wave patterns */}
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
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        <div className="mb-8 text-center">
          <p className="text-xl text-gray-700">Crea flashcards fácilmente de cualquier tema para estudiar mejor</p>
        </div>

        <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-3 text-lg font-medium text-gray-800">Ingresa tu contenido a practicar/evaluar aquí:</h2>
          <Textarea
            placeholder="Pega tu texto, apuntes o contenido que quieres convertir en flashcards..."
            className="mb-4 min-h-[100px] resize-none rounded-lg border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ height: Math.max(100, Math.min(300, content.split("\n").length * 24 + 50)) + "px" }}
          />
          <div className="flex justify-end">
            <Link href="/ready">
              <Button className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2 font-medium text-white hover:from-blue-600 hover:to-indigo-700">
                Generar Flashcards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

