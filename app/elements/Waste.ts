import Card from "./Card";
import {GameElement} from "../data/Interfaces";
import Base from "../game/Base";

/**
 * This is where the "discarded" cards go after they are plucked from the Stock.
 * However, the top most cards are visible, and the top most card can be
 * dragged to any foundation or pile where it is allowed to be added.
 */
export default class Waste extends Base implements GameElement {

    /**
     * All hidden cards in the waste.
     */
    private cards: Card[] = [];

    /**
     * All visible cards in the waste.
     */
    private visible: Card[] = [];

    /**
     * Move a card to the stock.
     * Usually done when recycling the waste.
     *
     * @param cards {Card[]}
     */
    public add(cards: Card[]): void {

        // Move currently visible cards to the remaining cards
        this.clearVisible();

        // Make new cards visible and add to list of visible cards
        this.visible = cards.map(card => {
            card.revealed = true;
            return card;
        });

        this.updateNode();
    }

    /**
     * Move any currently visible cards to the main cards array,
     * while marking the cards as not being revealed.
     */
    protected clearVisible(): void {
        while (this.visible.length) {
            let card = this.visible.pop();
            card.revealed = false;
            this.cards.push(card);
        }
    }

    /**
     * Get a card back from the stock.
     * Used when undoing an action that moved a card from the waste to the stock.
     *
     * @returns {Card}
     */
    public undoAdd(): Card {

        // TODO: Respect drawn cards. No reason to restore 3 visible cards if there were only two left visible.

        return this.cards.pop();
    }

    /**
     * Get all cards from the waste and.
     *
     * @returns {Card[]}
     */
    public recycle(): Card[] {
        this.clearVisible();

        let cards = this.cards;
        this.cards = [];

        this.updateNode();

        return cards;
    }

    /**
     * draw the top-most visible card.
     *
     * @returns {Card|null}
     */
    public draw(): Card {
        if (this.visible.length) {
            let card = this.visible.pop();

            if (this.visible.length === 0) {
                //while
            }

            return card;
        }

        return null;
    }

    /**
     * Initial setup for this elements DOM node.
     * Must set 'this.node' as well.
     *
     * @returns {HTMLElement}
     */
    public setupNode(): HTMLElement {
        this.node = document.createElement('div');
        this.node.className = 'waste';

        return this.updateNode();
    }

    updateNode(): HTMLElement {
        if (this.node) {
            this.node.innerHTML = '';

            let cards = document.createElement('p');
            cards.textContent = this.cards.length + ' hidden';
            this.node.appendChild(cards);

            let visible = document.createElement('p');
            visible.textContent = this.visible.length + ' visible';
            this.node.appendChild(visible);
        }

        return this.node;
    }

}