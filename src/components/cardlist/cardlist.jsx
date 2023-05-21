import React, { useEffect, useState } from "react"
import { Card } from "../card/card"
import "./cardlist.css"
import {ReactComponent as DownArrow} from "./img/downArrow.svg"

export const Cardlist = ({ cards, operationFavorite }) => {

    const [shortCards, setShortCards] = useState([]);
    const [doCardsHaveSmthElse, setDoCardsHaveSmthElse] = useState(false);
    const [foundLastIndex, setFoundLastIndex] = useState(8);

    useEffect(() => {
        if (cards.length !== 0) {
            if (cards.length <= 8) {
                const newShortCards = cards;
                setShortCards([...newShortCards]);
            } else if (cards.length > 8) {
                const newShortCards = cards.slice(0, foundLastIndex); // заново сетятся в момент лайка
                setShortCards([...newShortCards]);
                setDoCardsHaveSmthElse(true);
            }
        }
    }, [cards])

    const showElseCards = () => {
        if (doCardsHaveSmthElse) {
            const lastCardIndex = shortCards.length - 1;
            const plusCards = cards.slice(lastCardIndex + 1, lastCardIndex + 9);
            setShortCards(state => [...state, ...plusCards]);
        }
        setFoundLastIndex(shortCards.length + 8);
        if (cards.length === shortCards.length) {
            setDoCardsHaveSmthElse(false);
        }
    }

    return (
        <div>
            <div className="cards">
                {shortCards.map(item => {
                    return <Card key={item._id} product={item} operationFavorite={operationFavorite} />;
                })}
            </div>
            {cards.length !== shortCards.length && <button onClick={showElseCards} className="cards__show__else">Показать ещё <DownArrow /></button>}
        </div>
    );
}