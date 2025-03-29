'use client'

import { NameCard } from "@/components/ui/nameCard";
import { getRandomFlashcard, initializeTest, removeFlashcard } from "@/utils/localstorageUtils";
import { get } from "http";
import { useEffect, useState } from "react";

export default function TestPage() {
    const data = [
        { concept: "Opcion 1", definition: "A placeholder definition for John Doe."},
        { concept: "Opcion 2", definition: "A placeholder definition for Jane Smith."},
        { concept: "Opcion 3", definition: "A placeholder definition for Alice Johnson."},
    ];
    const [random, setRandom] = useState();
    const [cardjson, setCardjson] = useState<{ concept: string; definition: string; index: Number} | null>(null);

    useEffect(() => {
        
        const randomFlashCard = async () => {
            const flashcard = await getRandomFlashcard();
            setCardjson({
                concept: flashcard?.card?.concept || "",
                definition: flashcard?.card?.definition || "",
                index: flashcard?.index || 0,
            });
        };
        randomFlashCard();
    }, []);
    
    return <div>
        
        <NameCard concept={cardjson?.concept||""} description={cardjson?.definition} />
        <button
            onClick={ () => {
                if (cardjson) {
                    // Remove the flashcard from local storage
                    const updatedData = removeFlashcard(cardjson.index?.valueOf()||0);

                    // Redirect to "test2" page
                    //window.location.reload();
                }
            }}
        >
            Delete Flashcard
        </button>
    </div>;
}