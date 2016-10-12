export default class DomElement {

    /**
     *
     * @type {HTMLElement}
     */
    protected node: HTMLElement;

    /**
     *
     * @type {string}
     */
    protected className: string = '';

    /**
     *
     * @param {string} textContent
     */
    public createNode(textContent: string = ''): void {
        let node = document.createElement('div');
        node.textContent = textContent;
        node.className = this.className;
        this.node = node;
    }

    /**
     *
     * @returns {HTMLElement}
     */
    public getNode(): HTMLElement {
        return this.node;
    }
}