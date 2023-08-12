  const generateDeck = () => {
  const symbols = [1, 2, 3, 4, 5, 6, 7, 8]
   const deck = []
   
    for (let i = 0; i < 16; i++){
      const card = {
        isFlipped: false,
        symbol: symbols[i % 8],
      };
      deck.push(card)
    }
    shuffle(deck)
    return deck
  } 
 
 
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
  
console.log(generateDeck())