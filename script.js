class Card {
  constructor(suit, value){
    this.suit = suit;
    this.value = value;
    this.frontImage = `KIN's_Playing_Cards/KIN's_Playing_Cards/${suit}_${value}.png`
    this.backImage = "KIN's_Playing_Cards/KIN's_Playing_Cards/Back_1.png"
    this.name = `${value} of ${suit}`;
  }
}




class Deck{
  constructor(){

    this.deck = []
    this.reset();
    this.shuffle();

    

  }

  reset(){

    this.deck = []

    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const values = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push(new Card(`${suits[suit]}`, `${values[value]}`));
      }
    }
  }

  shuffle(){
    const deck = this.deck;
    let m = deck.length;
    let i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];


    }

    return this;

  }
  deal(){
    return this.deck.pop();
  }

  
}
const deck1 = new Deck();
console.log(deck1.deck);



playerHand = [];



function displayPlayerHand(newcard) {
  var div = document.createElement('div');
  div.innerHTML = `<img src=${newcard.frontImage}>`
  div.setAttribute('class', 'card');
  document.getElementById('hand').appendChild(div);
}





function addCard() {
  let newCard = deck1.deal();
  if (newCard === undefined){
    alert("No More Cards In Deck.")
  }else{
    displayPlayerHand(newCard);
  }


}