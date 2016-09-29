import Card from "./elements/Card";

export default class Game {

    /**
     * The DOM Node for the game board is the basis of the games representation in the browser.
     * This is where all cards are rendered and where all game interaction takes place.
     */
    private board: Node;

    /**
     * All cards in play.
     */
    private cards: Card[] = [];

    /**
     * Start the game.
     */
    start() {
        let boardNode = document.getElementById('board');

        if (!boardNode) {
            throw "Invalid id. Cannot find the mount point for the game board.";
        }

        // Set the DOM Node we will render the game in
        this.board = boardNode;

        // TODO:
        // Create all cards
        // Shuffle cards
        // Distribute cards to
        //  - 7 piles in the tableau
        //  - Every top most card in the tableau piles need to be revealed.
        //  - the rest goes in the stock
        // Initialize empty waste
        // Initialize 4 empty foundations

        // Append all DOM nodes
        // Register event listeners.
    }

}