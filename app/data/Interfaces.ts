export interface GameElement {
    /**
     * The DOM node representing this element
     */
    node: HTMLElement;

    /**
     * Initial setup for this elements DOM node.
     * Must set 'this.node' as well.
     *
     * @returns {HTMLElement}
     */
    setupNode(): HTMLElement;

    /**
     * Update the DOM node representing this element.
     *
     * @returns {HTMLElement}
     */
    updateNode(): HTMLElement;
}