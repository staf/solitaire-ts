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
     * Create a new Card.
     *
     * @param value
     * @param suit
     * @param revealed
     */
    constructor(value: CardValue, suit: CardSuit, revealed = false) {
        super();

        this.value = value;
        this.suit  = suit;
        this.revealed = revealed;

        this.createNode(`${CardValue[value]} ${CardSuit[suit]}`);
    }

    /**
     * Get the color value of this card.
     *
     * @returns {CardColor}
     */
    color(): CardColor {
        return (this.suit == CardSuit.Heart || this.suit == CardSuit.Diamond) ? CardColor.Red : CardColor.Black;
    }

}