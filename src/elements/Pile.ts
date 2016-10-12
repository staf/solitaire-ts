import DomElement from "../DomElement";
import Card from "./Card";
import {CardValue} from "../data/CardTypes";

/**
 * A pile is one of seven as part of the tableau which is where the main cards are.
 * They start off with each card, except the top most, in the pile being hidden.
 * You will add more cards sequentially in descending order here, with the
 * card's color alternating for every other card.
 */
export default class Pile extends DomElement {

    /**
     *
     * @type {Array}
     */
    public cards: Card[] = [];

    /**
     * The latest added card in this pile.
     *
     * @type {Card}
     */
    public topCard: Card;

    /**
     *
     */
    public index: Number;

    /**
     *
     * @type {string}
     */
    protected className: string = 'pile';

    /**
     *
     * @param index
     */
    constructor(index: Number) {
        super();

        this.index = index;
    }

    /**
     * Determine if this card can be added to this tableau pile. If it is empty we
     * will accept a king of any suit, otherwise we accept cards of the opposite
     * color with the value of one less than the top most card.
     *
     * @param card
     * @returns {boolean}
     */
    public canAddCard(card: Card): boolean {

        if (this.cards.length == 0 && card.value == CardValue.King) {
            return true
        }

        return this.topCard.color() !== card.color() && (this.topCard.value - 1) == card.value;
    }

    /**
     *
     * @returns {HTMLElement}
     */
    public render(): HTMLElement {

        this.createNode();

        for (let i = 0; i < this.cards.length; i++) {
            let node = this.cards[i].newNode();
            node.setAttribute('data-pile', String(this.index));
            node.setAttribute('data-index', String(i));
            this.node.appendChild(node);
        }

        return this.node;
    }
}
