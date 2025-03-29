"use client";

// app/page.tsx
import { generateFlashcardsAction } from "@/actions/openaiActions";
import { useState } from "react";

function FlashcardForm() {
  const [result, setResult] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    const userContent = formData.get("userContent") as string;
    const res = await generateFlashcardsAction(userContent);
    setResult(res);
  }

  return (
    <>
      <form action={handleSubmit}>
        <textarea
          name="userContent"
          placeholder="Pega tu texto o apuntes aquí..."
          className="p-3 border border-gray-300 rounded-md w-full max-w-md h-32 mb-4"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full"
        >
          Generar Flashcards
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-medium mb-2">Respuesta del OpenAI:</h3>
          <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-4">FlashYa</h1>
      <p className="text-xl text-gray-700 mb-8">
        Ingresa el contenido a evaluar
      </p>
      <FlashcardForm />
    </main>
  );
}
