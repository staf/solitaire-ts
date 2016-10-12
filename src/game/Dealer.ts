import Card from "../elements/Card";
import {CardValue, CardSuit} from "../data/CardTypes";

export default class Dealer {

    /**
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
     *
     * @param cards
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
}
