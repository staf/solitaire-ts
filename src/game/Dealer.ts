import Card from "../elements/Card";
import {CardValue, CardSuit} from "../data/CardTypes";
import Pile from "../elements/Pile";
import Stock from "../elements/Stock";

export default class Dealer {

    /**
     * Create a standard deck of cards without Jokers.
     *
     * @returns {Card[]}
     */
    static createCards(): Card[] {
        let cards: Card[] = [];
        for (let i = CardValue.Ace; i <= CardValue.King; i++) {
            cards.push(new Card(i, CardSuit.Clove));
            cards.push(new Card(i, CardSuit.Diamond));
            cards.push(new Card(i, CardSuit.Heart));
            cards.push(new Card(i, CardSuit.Spade));
        }

        return cards;
    }

    /**
     * Shuffle a deck of cards
     *
     * @param   {Card[]} cards
     * @returns {Card[]}
     */
    static shuffleCards(cards: Card[]): Card[] {
        let shuffleIndex = cards.length, randomIndex, tempCard;
        while (shuffleIndex !== 0) {
            randomIndex = Math.floor(Math.random() * shuffleIndex--);
            tempCard = cards[randomIndex];
            cards[randomIndex] = cards[shuffleIndex];
            cards[shuffleIndex] = tempCard;
        }

        return cards;
    }

    /**
     * Build the tableau consisting of 7 piles
     *
     * @param   {Stock} stock
     * @returns {Pile[]}
     */
    static buildTableau(stock: Stock): Pile[] {
        let tableau: Pile[] = [];
        for (let i = 0; i < 7; i++) {
            tableau.push(new Pile(i));
        }

        let added = 0;
        let card;
        while (added < 28) {

            for (let i = 1; i <= tableau.length; i++) {
                let index = i - 1;


                if (tableau[index].cards.length < index) {
                    /**
                     * If there are fewer cards than should be hidden in the pile
                     * we simply draw a card and add it to the pile.
                     */
                    card = stock.draw();
                    card.isInPile = true;
                    tableau[index].cards.push(card);
                    added++;

                } else if (tableau[index].cards.length == index) {
                    /**
                     * If this is the last card we add to this pile we reveal it
                     * before adding it to the pile.
                     */
                    card = stock.draw();
                    card.isInPile = true;
                    card.revealed = true;
                    tableau[index].cards.push(card);
                    added++;
                }
            }
        }

        return tableau;
    }
}
