import DomElement from "../DomElement";
import Card from "./Card";

/**
 * This is where the "discarded" cards go after they are plucked from the Stock.
 * However, the top most cards are visible, and the top most card can be
 * dragged to any foundation or pile where it is allowed to be added.
 */
export default class Waste extends DomElement {

    /**
     * All hidden cards in the waste.
     */
    private cards: Card[] = [];

    /**
     * All visible cards in the waste.
     */
    private visible: Card[] = [];

}