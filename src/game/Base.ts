import Game from "../Game";

export default class Base {

    /**
     * The DOM node representing the stock.
     *
     * @type {HTMLElement}
     */
    public node: HTMLElement;

    /**
     * Store a reference to the game object.
     *
     * @type {Array}
     */
    protected game: Game;

    /**
     * Instantiate this class with the game instance.
     *
     * @param {Game} game
     */
    public constructor(game: Game) {
        this.game = game;
    }

}