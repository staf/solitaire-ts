import Game from './Game';

/**
 * We wrap the game creation in a try - catch block.
 * This way we separate out the error handling from the game itself.
 *
 * Might change this around later but it is convenient for early development.
 */
try {

    const game = new Game();
    document.addEventListener('DOMContentLoaded', () => game.start());

} catch (e) {

    document.body.innerHTML = `<h1>ERROR</h1><p>${e}</p>`;

}
