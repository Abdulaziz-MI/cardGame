import Deck from "./support/deck.js";
const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    '8': 8,
    "9": 9,
    '10': 10,
    J: 11,
    Q: 12,
    K: 13,
    Ace: 14,
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')

const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
let playerDeck, computerDeck, inRound, stop;
const startBtn = document.querySelector('#startBtn').addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    } 
    if (inRound) {
        cleanBeforeRound()
    }
    else { flipCards() }
})
const text = document.querySelector('.text')

function startGame() {
    const deck = new Deck()
    deck.shuffle()

    const deckMidPoint = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0, deckMidPoint))
    computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards))
    inRound = false
    stop = false
    cleanBeforeRound()
}
function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ''
    playerCardSlot.innerHTML = ''
    text.textContent = ''

    updateDeckCount()
}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)) {
        text.textContent = "Player won the round"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    }
    else if (isRoundWinner(computerCard, playerCard)) {
        text.textContent = "Player lost the round"
        computerDeck.push(computerCard)
        computerDeck.push(playerCard)
    }
    else {
        text.textContent = "Draw"
        computerDeck.push(computerCard)
        playerDeck.push(playerCard)
    }

    if (isGameover(playerDeck)) {
        text.textContent = "You Lost!"
        stop = true
    }
    else if (isGameover(computerDeck)) {
        text.textContentc = "You Won!!"
        stop = true
    }
}

function updateDeckCount() {
    computerDeckElement.textContent = computerDeck.numberOfCards
    playerDeckElement.textContent = playerDeck.numberOfCards
}


function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]

}

function isGameover(deck) {
    return deck.numberOfCards === 0
}


startGame()