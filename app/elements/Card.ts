import {CardValue, CardSuit, CardColor} from "../data/CardTypes";
import {GameElement} from "../data/Interfaces";

/**
 * The main Card class. Contains basic data about each card.
 * Can be one of four suits and have one of thirteen values.
 */
export default class Card implements GameElement {

    public node: HTMLElement;

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
     * The callback to run when this card is selected.
     *
     * @type {Function}
     */
    private selectCallback: Function;

    /**
     * Has this card been revealed
     *
     * @type {boolean}
     */
    public revealed: boolean;

    /**
     * Is this card currently in a pile?
     * Set "from outside" when card is being moved.
     *
     * @type {boolean}
     */
    public isInPile: boolean = false;

    /**
     * Is this card currently in a foundation?
     * Set "from outside" when card is being moved.
     *
     * @type {boolean}
     */
    public isInFoundation: boolean = false;

    /**
     * Create a new Card.
     *
     * @param value
     * @param suit
     * @param selectCallback
     */
    constructor(value: CardValue, suit: CardSuit, selectCallback: Function) {
        this.value = value;
        this.suit = suit;
        this.selectCallback = selectCallback;
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
    setupNode(): HTMLElement {
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

        node.addEventListener('click', () => {
            console.log(CardValue[this.value], CardSuit[this.suit]);
            if (this.isSelectable()) {
                console.log('can select');
                this.selectCallback(this);
            }
        });

        return this.node = node;
    }

    isSelectable(): boolean {
        return this.revealed === true;
    }

    /**
     *
     * @returns {HTMLElement}
     */
    updateNode(): HTMLElement {
        return this.node;
    }

    acceptsSibling(card: Card): boolean {

        if (this.isInFoundation) {
            return card.suit === this.suit && card.value === (this.value + 1);
        }

        if (this.isInPile) {
            return card.color() !== this.color() && card.value === (this.value - 1);
        }

        return false;
    }
}
