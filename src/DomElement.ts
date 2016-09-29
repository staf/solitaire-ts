export default class DomElement {

    /**
     *
     */
    protected node : Node;

    /**
     *
     * @param textContent
     */
    createNode(textContent: string) : void {
        let node = document.createElement('div');
        node.textContent = textContent;
        this.node = node;
    }

    /**
     *
     * @returns {Node}
     */
    getNode() : Node {
        return this.node;
    }
}