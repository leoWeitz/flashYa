export interface Flashcard {
  concept: string;
  definition: string;
}

enum rigss {
  MODERATE = "Acepta como correcto si la respuesta capta la idea general, aunque no sea exacta.",
  PRECISE = "Acepta como correcto si la respuesta incluye los conceptos clave de la definición.",
  STRICT = "Acepta como correcto solo si la respuesta expresa todos los aspectos con la definición dada.",
}

export function initializeTest(cards: Flashcard[]): void {
  if (!Array.isArray(cards)) {
    console.error("El argumento debe ser un array de objetos.");
    return;
  }
  console.log(cards);
  localStorage.setItem("flashcards", JSON.stringify(cards));
}

export function setRigorousness(rigorousness: rigss): void {
  localStorage.setItem("rigourousness", rigorousness);
}

export function getRandomFlashcard(): {
  card: Flashcard;
  index: number;
} | null {
  const storedData = localStorage.getItem("flashcards");
  if (!storedData) {
    console.error("No hay flashcards almacenadas.");
    return null;
  }

  const flashcards: Flashcard[] = JSON.parse(storedData);
  if (flashcards.length === 0) {
    console.error("No hay flashcards disponibles.");
    return null;
  }

  const randomIndex = Math.floor(Math.random() * flashcards.length);
  return { card: flashcards[randomIndex], index: randomIndex };
}

export function removeFlashcard(index: number): void {
  const storedData = localStorage.getItem("flashcards");
  if (!storedData) {
    console.error("No hay flashcards almacenadas.");
    return;
  }

  const flashcards: Flashcard[] = JSON.parse(storedData);
  if (index < 0 || index >= flashcards.length) {
    console.error("Índice fuera de rango.");
    return;
  }

  const updatedFlashcards = flashcards.filter((_, i) => i !== index);
  flashcards.length = 0;
  flashcards.push(...updatedFlashcards);
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  console.log("Removed" + index + "from local storage");
  console.log(flashcards);
}

export function getFlashcards(): Flashcard[] {
  const storedData = localStorage.getItem("flashcards");
  if (!storedData) {
    console.error("No hay flashcards almacenadas.");
    return [];
  }
  return JSON.parse(storedData);
}

export function getRigorousness(): rigss {
  const rigorousness = localStorage.getItem("rigourousness");
  if (!rigorousness) {
    return rigss.MODERATE;
  }
  return rigorousness as rigss;
}
