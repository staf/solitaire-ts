import DomElement from "../DomElement";
import Card from "./Card";
import {CardValue, CardSuit} from "../data/CardTypes";

/**
 * A foundation is one of the four piles of cards you aim to fill during the course of the elements.
 * These each consist of a card suit and must contain the cards of that suit in sequential order.
 */
export default class Foundation extends DomElement {

    /**
     * Array containing all the cards of the foundation
     *
     * @type {Array}
     */
    public cards: Card[] = [];

    /**
     * The suit of the cards currently allowed in this foundation
     *
     * @type {number|CardSuit}
     */
    public suit: CardSuit;

    /**
     * The value of the latest added card in this foundation
     *
     * @type {number|CardValue}
     */
    public highestValue: CardValue;

    /**
     * Determine if we can add the card to this foundation. If there are no cards
     * we will accept any Ace, but otherwise it needs to be the same suit as this
     * foundation contains and be the next sequential card in the series.
     *
     * @param card
     * @returns {boolean}
     */
    canAddCard(card: Card): boolean {

        if (this.cards.length == 0 && card.value == CardValue.Ace) {
            return true
        }

        return this.suit == card.suit && (this.highestValue + 1) == card.value;
    }
}
