import Dealer from "./game/Dealer";
import Pile from "./elements/Pile";
import Stock from "./elements/Stock";
import Waste from "./elements/Waste";
import Foundation from "./elements/Foundation";
import Settings from "./game/Settings";
import Card from "./elements/Card";

export default class Game {

    /**
     * The DOM Node for the elements board is the basis of the games representation in the browser.
     * This is where all cards are rendered and where all elements interaction takes place.
     */
    private board: HTMLElement;

    /**
     * The stock. The source of cards.
     *
     * @type {Stock}
     */
    private stock: Stock;

    /**
     * The waste: The drawn cards.
     *
     * @type {Waste}
     */
    private waste: Waste;

    /**
     * Any currently selected card, i.e. the card the user is currently dragging.
     */
    private selected: Card;

    /**
     * Metadata about the currently selected card.
     *
     * @type {Object}
     */
    private selectedMeta: Object = {
        dragging: false,
        stack: []
    };

    /**
     * Start the elements.
     */
    public start() {
        let boardNode = document.getElementById('board');

        if (!boardNode) {
            throw "Invalid id. Cannot find the mount point for the elements board.";
        }

        /**
         * Set the DOM Node we will render the elements in
         *
         * @type {HTMLElement}
         */
        this.board = boardNode;

        /**
         * Create the stock and all cards.
         * Shuffle the cards before adding them to the stock.
         */
        this.stock = new Stock(this);
        Dealer.shuffleCards(Dealer.createCards(this.selectCard)).forEach(c => this.stock.add(c));

        /**
         * Distribute cards to 7 piles in the tableau
         */
        let tableau = Dealer.buildTableau(this.stock);

        // Initialize empty waste
        this.waste = new Waste(this);

        let boardHeader = document.createElement('div');
        boardHeader.classList.add('board__header');

        // Create DOM node for the stock and waste
        boardHeader.appendChild(this.stock.setupNode());
        boardHeader.appendChild(this.waste.setupNode());

        // Initialize 4 empty foundations
        let foundations = [
            new Foundation(),
            new Foundation(),
            new Foundation(),
            new Foundation()
        ];

        foundations.forEach(f => {
            f.createNode();
            boardHeader.appendChild(f.getNode());
        });

        this.board.appendChild(boardHeader);

        let tableauEl = document.createElement('div');
        tableauEl.classList.add('tableau');
        tableau.forEach(p => tableauEl.appendChild(p.render()));
        this.board.appendChild(tableauEl);
    }

    public drawFromStock() {
        if (this.stock.hasCard()) {

            let cards = [];
            while (cards.length < Settings.drawCount) {
                if (!this.stock.hasCard()) break;
                cards.unshift(this.stock.draw());
            }
            this.waste.add(cards);

        } else {
            // If there are no cards a click on the stock will recycle the waste.
            this.waste.recycle().forEach(card => this.stock.add(card));
        }
    }

    private selectCard(card: Card): void {
        this.selected = card;
        console.log(card);
    }
}