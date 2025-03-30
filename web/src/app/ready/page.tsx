import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavBar } from "@/components/nav-bar";
import { LightbulbIcon } from "lucide-react";

export default function ReadyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <NavBar compact />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16">
        <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-md border border-slate-100">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <LightbulbIcon className="h-10 w-10 text-blue-500" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-slate-800">
              ¡Tus flashcards están listas!
            </h2>
            <p className="mb-8 text-slate-500">
              Hemos generado flashcards basadas en tu contenido. ¿Estás listo
              para comenzar a practicar?
            </p>
            <Link href="/practice">
              <Button className="rounded-full bg-blue-500 hover:bg-blue-600 px-8 py-3 font-medium text-white mb-4">
                ¡Estoy listo!
              </Button>
            </Link>
            <Link href="/view">
              <Button className="rounded-full bg-blue-500 hover:bg-blue-600 px-8 py-3 font-medium text-white">
                Quiero ver mis flashcards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
