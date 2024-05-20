class PlayingCard{
  constructor(suit, value, faceImage){
    this.suit = suit;
    this.value = value;
    this.faceImage = `<img src="KIN's_Playing_Cards/KIN's_Playing_Cards/${faceImage}">`;
    this.name = `${value} of ${suit}'s`;
    this.backImage = `<img src="KIN's_Playing_Cards/KIN's_Playing_Cards/Back_1.png">`
  }

  displayCard() {
    var div = document.createElement('div');
    div.innerHTML = this.faceImage;
    div.setAttribute('class', 'card');
    document.getElementById('hand').appendChild(div);
  }

}

const aceOfSpades = new PlayingCard('spade', 'ace', 'Spades_ACE.png');



function addCard() {
  aceOfSpades.displayCard();
}