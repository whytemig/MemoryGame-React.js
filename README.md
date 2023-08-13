MemoryCard Game 

import { useState, useEffect } from "react";
import "./App.css";
import MemoryCard from "./components/MemoryCard";

function App() {
  const [deck, setDeck] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);
  
---> Importing the necessary modules and components from React and your project.
Defining the App component function.
Initializing two pieces of state: deck (an array of card objects) and pickedCards (an array to track the currently picked cards). <---

  const generateDeck = () => {
    const symbols = ['🤡', '🤮', '😀', '😈', '😎', '😡', '😨', '😵'];
    const deck = [];

    for (let i = 0; i < 16; i++) {
      const card = {
        isFlipped: false,
        symbol: symbols[i % 8],
      };
      deck.push(card);
    }
    return shuffle(deck);
  };

---> Defining a function generateDeck that creates an array of card objects with symbols (emojis) and sets the isFlipped property to false for all cards.
Shuffling the deck using the shuffle function (defined later) before returning it. <---

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  useEffect(() => {
    setDeck(generateDeck());
  }, [setDeck]);

  --->Using the useEffect hook to generate a new shuffled deck when the component mounts or when setDeck changes.<---

    const pickCard = (cardIndex) => {
    if (deck[cardIndex].isFlipped !== false) {
      return;
    } else if (deck[cardIndex].isFlipped === false) {
      const cardToFlip = { ...deck[cardIndex], isFlipped: true };
      let newPickedCards = pickedCards.concat(cardIndex);
      const newDeck = deck.map((card, index) => {
        if (cardIndex === index) {
          return cardToFlip;
        }
        return card;
      });

      if (newPickedCards.length === 2) {
        const card1Index = newPickedCards[0];
        const card2Index = newPickedCards[1];
        if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
          setTimeout(() => {
            unflipCard(card1Index, card2Index);
            setPickedCards([]);
          }, 1000);
        } else {
          newPickedCards = [];
        }
      }

      setDeck(newDeck);
      setPickedCards(newPickedCards);
    }
  };
--->Defining the pickCard function to handle card selection.
Checking if the selected card is not flipped already.
Flipping the selected card and updating the pickedCards array.
Checking if two cards are picked and comparing their symbols. If symbols don't match, the cards are unflipped after a delay.
Updating the deck and pickedCards states accordingly.<---

  const unflipCard = (card1Index, card2Index) => {
    let card1 = { ...deck[card1Index], isFlipped: false };
    let card2 = { ...deck[card2Index], isFlipped: false };
    const newDeck = deck.map((card, index) => {
      if (index === card1Index) {
        return card1;
      }
      if (index === card2Index) {
        return card2;
      }
      return card;
    });
    setDeck(newDeck);
  };
--->Defining the unflipCard function to unflip cards by changing the isFlipped property back to false.<---

  const cardJSX = deck.map((card, index) => {
    return (
      <MemoryCard
        symbol={card.symbol}
        isFlipped={card.isFlipped}
        key={index}
        pickCard={() => pickCard(index)}
      />
    );
  });
--->Generating an array of JSX elements for the memory cards. Each MemoryCard component receives the card's symbol, isFlipped state, and a pickCard function.<---


  return (
    <>
      <div>
        <h1 className="header">Memory Game</h1>
        <h4>Match cards to win</h4>
      </div>
      {cardJSX.slice(0, 4)}
      {cardJSX.slice(4, 8)}
      {cardJSX.slice(8, 12)}
      {cardJSX.slice(12, 16)}
      <div></div>
    </>
  );
}
--->Returning the JSX structure for the game board.
Displaying the title and instructions.
Rendering the memory card elements in a grid-like layout.<---
