import DomElement from "../DomElement";
import {CardValue, CardSuit, CardColor} from "../data/CardTypes";

/**
 * The main Card class. Contains basic data about each card.
 * Can be one of four suits and have one of thirteen values.
 */
export default class Card extends DomElement {

    /**
     * The value of the card. Two-Ten, Jack, Queen, King or Ace.
     *
     * @type {CardValue}
     */
    public value: CardValue;

    /**
     * The suit of the card. Heart, Diamond, Spade or Clove.
     *
     * @type {CardSuit}
     */
    public suit: CardSuit;

    /**
     * Has this card been revealed
     *
     * @type {boolean}
     */
    public revealed: boolean;

    /**
     *
     * @type {string}
     */
    protected className: string = 'card';

    /**
     * Create a new Card.
     *
     * @param value
     * @param suit
     * @param revealed
     */
    constructor(value: CardValue, suit: CardSuit, revealed = false) {
        super();

        this.value = value;
        this.suit = suit;
        this.revealed = revealed;

    }

    /**
     * Get the color value of this card.
     *
     * @returns {CardColor}
     */
    public color(): CardColor {
        return (this.suit == CardSuit.Heart || this.suit == CardSuit.Diamond) ? CardColor.Red : CardColor.Black;
    }

    /**
     *
     * @returns {HTMLElement}
     */
    public newNode(): HTMLElement {

        let node = document.createElement('div');
        node.classList.add('card');
        node.setAttribute('data-suit', String(this.suit));
        node.setAttribute('data-value', String(this.value));

        if (this.revealed) {
            node.classList.add('card--revealed');
            node.textContent = `${CardValue[this.value]} ${CardSuit[this.suit]}`;

        } else {
            node.textContent = 'HIDDEN';
        }

        node.addEventListener('click', function () {
            console.log(
                this.getAttribute('data-pile'),
                this.getAttribute('data-index'),
                CardSuit[this.getAttribute('data-suit')],
                CardValue[this.getAttribute('data-value')]
            );
        });

        return node;
    }
}
