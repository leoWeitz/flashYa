export interface Flashcard {
    concept: string;
    definition: string;
}

export function initializeTest(cards: Flashcard[]): void {
    if (!Array.isArray(cards)) {
        console.error("El argumento debe ser un array de objetos.");
        return;
    }
    console.log(cards);

    localStorage.setItem("flashcards", JSON.stringify(cards));
    localStorage.setItem("discardedFlashcards", JSON.stringify([]));
}

export function getRandomFlashcard(): { card: Flashcard; index: number } | null {
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
    const discardedData = localStorage.getItem("discardedFlashcards");
    
    if (!storedData) {
        console.error("No hay flashcards almacenadas.");
        return;
    }

    const flashcards: Flashcard[] = JSON.parse(storedData);
    const discardedFlashcards: Flashcard[] = discardedData ? JSON.parse(discardedData) : [];

    if (index < 0 || index >= flashcards.length) {
        console.error("Índice fuera de rango.");
        return;
    }

    // Get the card to be removed
    const removedCard = flashcards[index];
    
    // Add it to discarded flashcards
    discardedFlashcards.push(removedCard);
    
    // Remove from active flashcards
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    
    // Update both arrays in localStorage
    localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));
    localStorage.setItem("discardedFlashcards", JSON.stringify(discardedFlashcards));
    
    console.log("Moved card" + index + "to discarded flashcards");
    console.log("Active flashcards:", updatedFlashcards);
    console.log("Discarded flashcards:", discardedFlashcards);
}

export function getFlashcards(): Flashcard[] {
    const storedData = localStorage.getItem("flashcards");
    if (!storedData) {
        console.error("No hay flashcards almacenadas.");
        return [];
    }
    return JSON.parse(storedData);
}

export function getDiscardedFlashcards(): Flashcard[] {
    const discardedData = localStorage.getItem("discardedFlashcards");
    if (!discardedData) {
        return [];
    }
    return JSON.parse(discardedData);
}