import Card from "./Card";
import Base from "../game/Base";
import {GameElement} from "../data/Interfaces";

/**
 * This is the "reserve" of cards. Any cards not
 */
export default class Stock extends Base implements GameElement {

    /**
     * All cards in the stock.
     *
     * @type {Array}
     */
    private cards: Card[] = [];

    /**
     * determine if the stock has any cards in it.
     *
     * @returns {boolean}
     */
    public hasCard(): boolean {
        return this.cards.length > 0;
    }

    /**
     * Get a card from the stock.
     * Used when moving cards from the stock to the waste.
     *
     * @returns {Card}
     */
    public draw(): Card {
        let card = this.cards.pop();
        this.updateNode();
        return card;
    }

    /**
     * Return a card from the waste to the stock.
     * Used when undoing the last action that meant pulling a card from the stock.
     *
     * @param card
     */
    public undoDraw(card: Card): void {
        this.cards.push(card);
    }

    /**
     * Move a card to the stock.
     * Usually done when recycling the waste.
     *
     * @param card
     */
    public add(card: Card): void {
        this.cards.unshift(card);
        this.updateNode();
    }

    /**
     * Get a card back from the stock.
     * Used when undoing an action that moved a card from the waste to the stock.
     *
     * @returns {Card}
     */
    public undoAdd(): Card {
        return this.cards.shift();
    }

    public setupNode(): HTMLElement {
        this.node = document.createElement('div');

        this.node.className = 'stock';
        this.node.addEventListener('click', () => this.game.drawFromStock());

        return this.updateNode();
    }

    public updateNode(): HTMLElement {
        if (this.node) {
            this.node.textContent = this.cards.length + ' cards';
        }

        return this.node;
    }
}
