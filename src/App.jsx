import { useState, useEffect } from "react";
import "./App.css";
import MemoryCard from "./conponents/MemoryCard";

function App() {
  const [deck, setDeck] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);

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
  // the setDeck holds the value of the generated shuffle deck of card which are objects. So basically we hold an Array of shuffle objects. By using the useEffect we will reshuffle the cards each time.

  const pickCard = (cardIndex) => {
    if (deck[cardIndex].isFlipped !==false) {
      return;
    } else if (deck[cardIndex].isFlipped ===false){
        const cardToFlip = { ...deck[cardIndex], isFlipped: true };
    // Using the spread operator like this will create a carbon-copy of the card we’re trying to flip

    let newPickedCards = pickedCards.concat(cardIndex);
    // concat look up?

    const newDeck = deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

    if (newPickedCards.length === 2) {
      const card1Index = newPickedCards[0];
      const card2Index = newPickedCards[1];
      console.log(card1Index);
      console.log(card2Index);
      if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
       
       setTimeout(() =>  {unflipCard(card1Index,card2Index); setPickedCards([]);}, 1000)
      } else {
        newPickedCards = [];
      }
    }

    setDeck(newDeck);
    setPickedCards(newPickedCards);
    }
  
  };

  // function pickCard (cardIndex) {
  //   if (deck[cardIndex].isFlipped === false) {
  //     let cardToFlip = {...deck[cardIndex], isFlipped: true}
  //     let newPickedCards = pickedCards.concat(cardIndex)
  //     let newDeck = deck.map((card,index) => {
  //       if (cardIndex === index) {
  //         return cardToFlip
  //       }
  //       return card
  //     })

  //     if (newPickedCards.length == 2) {
  //       let card1index = newPickedCards[0]
  //       let card2index = newPickedCards[1]
  //       if(deck[card1index].symbol !== deck[card2index].symbol) {
  //         setTimeout(() =>  {unflipCard(card1index,card2index); setPickedCards([]);}, 1000)
  //       } else {
  //         //empty the cards array because the player found a match
  //         newPickedCards = []
  //       }
  //     }

  //     setDeck(newDeck)
  //     setPickedCards(newPickedCards)
  //     }else if (deck[cardIndex].isFlipped === true) {
  //       return;
  //     }

  // }

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

export default App;
