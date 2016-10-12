import Dealer from "./game/Dealer";
import Pile from "./elements/Pile";
import Stock from "./elements/Stock";

export default class Game {

    /**
     * The DOM Node for the elements board is the basis of the games representation in the browser.
     * This is where all cards are rendered and where all elements interaction takes place.
     */
    private board: HTMLElement;

    /**
     * The stock. The source of cards.
     */
    private stock: Stock;

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
        this.stock = new Stock();
        Dealer.shuffleCards(Dealer.createCards()).forEach(c => this.stock.add(c));


        /**
         * Distribute cards to 7 piles in the tableau
         */
        let tableau: Pile[] = [];
        for (let i = 0; i < 7; i++) {
            tableau.push(new Pile(i));
        }

        let added = 0;
        while (added < 28) {

            for (let i = 1; i <= tableau.length; i++) {
                let index = i - 1;

                if ((tableau.length - i) > tableau[index].cards.length) {
                    /**
                     * If there are fewer cards than should be hidden in the pile
                     * we simply draw a card and add it to the pile.
                     */
                    tableau[index].cards.push(this.stock.draw());
                    added++;

                } else if ((tableau.length - i) == tableau[index].cards.length) {
                    /**
                     * If this is the last card we add to this pile we reveal it
                     * before adding it to the pile.
                     */
                    let card = this.stock.draw();
                    card.revealed = true;
                    tableau[index].cards.push(card);
                    added++;
                }
            }
        }

        let tableauEl = document.createElement('div');
        tableauEl.classList.add('tableau');
        tableau.forEach(p => tableauEl.appendChild(p.render()));
        this.board.appendChild(tableauEl);


        // Initialize empty waste
        // Initialize 4 empty foundations

        // Append all DOM nodes
        // Register event listeners.
    }

}