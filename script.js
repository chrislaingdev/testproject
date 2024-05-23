class Card {
  constructor(suit, value, power){
    this.suit = suit;
    this.value = value;
    this.frontImage = `KIN's_Playing_Cards/KIN's_Playing_Cards/${suit}_${value}.png`
    this.backImage = "KIN's_Playing_Cards/KIN's_Playing_Cards/Back_1.png"
    this.name = `${value} of ${suit}`;
    this.power = power;
  }
}




class Deck{
  constructor(){

    this.deck = [];
    this.reset();
    this.shuffle();
    this.playerDeck = [];
    this.opponentDeck = [];
    this.playerCard = undefined;
    this.opponentCard = undefined;
    this.splitDeck();

  }

  reset(){

    this.deck = []

    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const values = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
     

    for (let suit in suits) {
      for (let value in values) {
        let power;
        if(["J", "Q", "K"].includes(values[value])){
          power = 10;
        } else if (values[value] === 'ACE'){
          power = 11;
        } else {
          power = Number(values[value]);
        }

        this.deck.push(new Card(`${suits[suit]}`, `${values[value]}`, power));
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

  splitDeck(){
    console.log('splitting deck...')
    this.playerDeck = this.deck.splice(0, 26);
    console.log(this.playerDeck);
    this.opponentDeck = this.deck.splice(0, 26);
    console.log(this.opponentDeck);
  }

  dealNextCards(){
    
    this.playerCard = this.playerDeck.pop();
    console.log("player card: ", this.playerCard);
    this.opponentCard = this.opponentDeck.pop();
    console.log("opponent card: ",this.opponentCard);
    this.displayRoud();
  }


  displayRoud(){
    let clearDiv1 = document.getElementById('hand');
    let clearDiv2 = document.getElementById('opponent-hand');
    let clearMessage = document.getElementById('message-display');
    clearDiv1.innerHTML = '';
    clearDiv2.innerHTML = '';
    clearMessage.innerHTML = '';
    
    var div1 = document.createElement('div');
    div1.innerHTML = `<img src=${this.playerCard.frontImage}>`
    div1.setAttribute('class', 'card');
    document.getElementById('hand').appendChild(div1);

    var div2 = document.createElement('div');
    div2.innerHTML = `<img src=${this.opponentCard.frontImage}>`
    div2.setAttribute('class', 'card');
    document.getElementById('opponent-hand').appendChild(div2);
    
  }
  determineRound(){
    if (this.playerCard.power > this.opponentCard.power){
      console.log("player wins round with their ", this.playerCard.name );
      this.playerDeck.unshift(this.playerCard);
      this.playerDeck.unshift(this.opponentCard);
      console.log('new player deck after win:', this.playerDeck);
      console.log('new opponent deck:', this.opponentDeck);
    } else if (this.playerCard.power < this.opponentCard.power){
      console.log('opponent wins round with their ', this.opponentCard.name);
      this.opponentDeck.unshift(this.opponentCard);
      this.opponentDeck.unshift(this.playerCard);
      console.log('new opponent deck after win:', this.opponentDeck);
    }

    
  }

}

const deck1 = new Deck();












