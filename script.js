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
    this.playerCard;
    this.opponentCard;
    this.warPile = [];
    this.warPileEmpty = true;
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

  dealNextCards(clear = true, front = true, displayOnly = false){
    if (clear){
      clearUI();
    }
    if (this.playerDeck.length === 0){
      this.gameOver('LOSE');
      return;
    }
    if (this.opponentDeck.length === 0){
      this.gameOver('WIN');
      return;
    }
    
    this.playerCard = this.playerDeck.pop();
    console.log("Cards In Deck: ", this.playerCard);
    this.opponentCard = this.opponentDeck.pop();
    console.log("Cards In Deck: ",this.opponentCard);
    this.displayRoud(front, displayOnly);
  }

  gameOver(outcome){
    let message = document.getElementById('message-display');
    let resetButton = document.getElementById('reset-button');
    let dealButton = document.getElementById('deal-button');
    resetButton.classList.toggle('hide-button');
    dealButton.classList.toggle('hide-button');
    if(outcome === 'LOSE'){
      clearUI();
      message.innerHTML = 'You Lose!'
    } else{
      clearUI();
      message.innerHTML = 'You WIN!'
    }
  }


  displayRoud(front = true, displayOnly = false){
    let playerImage = this.playerCard.frontImage;
    let opponentImage = this.opponentCard.frontImage;
    if (!front ){
      playerImage = this.playerCard.backImage;
      opponentImage = this.opponentCard.backImage;
    }


    var div1 = document.createElement('div');
    div1.innerHTML = `<img src=${playerImage}>`
    div1.setAttribute('class', 'card');
    document.getElementById('hand').appendChild(div1);

    var div2 = document.createElement('div');
    div2.innerHTML = `<img src=${opponentImage}>`
    div2.setAttribute('class', 'card');
    document.getElementById('opponent-hand').appendChild(div2);

    if (!displayOnly){
      this.determineRound();
    }
    
  }

  war (){
    this.warPile.unshift(this.playerCard, this.opponentCard)
    this.warPileEmpty = false;
    this.dealNextCards(false, false, true);
    this.warPile.unshift(this.playerCard, this.opponentCard)
    this.dealNextCards(false, true);
  }

  depositWarPile (card) {
    this.playerDeck.unshift(card);
  }

  determineRound(){
    let message = document.getElementById('message-display');
    let playerCardCount = document.getElementById('player-card-count');
    let opponentCardCount = document.getElementById('opponent-card-count');
    playerCardCount.innerHTML = `Cards In Deck: ${this.playerDeck.length}`;
    opponentCardCount.innerHTML = `Cards In Deck: ${this.opponentDeck.length}`;
    if (this.playerCard.power > this.opponentCard.power){
      message.innerHTML = 'You win this round';
      if (!this.warPileEmpty){
        this.playerDeck.unshift(...this.warPile);
        this.warPile = [];
        this.warPileEmpty = true;
      }
      this.playerDeck.unshift(this.playerCard);
      this.playerDeck.unshift(this.opponentCard);

    } else if (this.playerCard.power < this.opponentCard.power){
      message.innerHTML = 'Opponent wins this round';
      if (!this.warPileEmpty){
        this.opponentDeck.unshift(...this.warPile);
        this.warPile = [];
        this.warPileEmpty = true;
      }
      this.opponentDeck.unshift(this.opponentCard);
      this.opponentDeck.unshift(this.playerCard);
    } else{
      message.innerHTML = 'WAR!';
      this.war()
    }

  
  
  console.log('player deck count: ', this.playerDeck.length);
  console.log(this.playerDeck);

  console.log('opponent deck count: ', this.opponentDeck.length);
  console.log(this.opponentDeck);
  }

}

function clearUI (){
  let clearDiv1 = document.getElementById('hand');
  let clearDiv2 = document.getElementById('opponent-hand');
  let clearMessage = document.getElementById('message-display');
  clearDiv1.innerHTML = '';
  clearDiv2.innerHTML = '';
  clearMessage.innerHTML = '';
}

let deck1 = new Deck();

function resetGame(){
  let message = document.getElementById('message-display');
  let resetButton = document.getElementById('reset-button');
  let dealButton = document.getElementById('deal-button');
  resetButton.classList.toggle('hide-button');
  dealButton.classList.toggle('hide-button');
  message.innerHTML = 'WAR';
  deck1 = new Deck();
}












