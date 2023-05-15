import React from "react"
import { Card } from "../card/card"
import "./cardlist.css"
import { SorryNoProducts } from "../sorryNoProducts/sorryNoProducts"
import { FoundProducts } from "../foundProducts/foundProducts"

export const Cardlist = ({cards, user, operationFavorite, debounceValueInApp, sortCards}) => {
    const singleSelect = (event) => {
        let selected = document.querySelectorAll('.cards__sort__elem');
        for (let elem of selected) {
            elem.classList.remove('active');
        }
        event.target.classList.add('active');
    }

    return (
        <div className="cards__container__main">
            {cards.length === 0
            ? <SorryNoProducts debounceValueInApp={debounceValueInApp}/>
            : <FoundProducts debounceValueInApp={debounceValueInApp} cards={cards}/>}
            <div className="cards__container__sort">
                {cards.length !== 0 && <div className="cards__sort" onClick={singleSelect}>
                        <span className="cards__sort__elem" onClick={sortCards}>Популярные</span>
                        <span className="cards__sort__elem" onClick={sortCards}>Новинки</span>
                        <span className="cards__sort__elem" onClick={sortCards}>Сначала дешёвые</span>
                        <span className="cards__sort__elem" onClick={sortCards}>Сначала дорогие</span>
                        {/* Рейтинг пока не работает, как положено */}
                        <span className="cards__sort__elem" onClick={sortCards}>По рейтингу</span>
                        <span className="cards__sort__elem" onClick={sortCards}>По скидке</span>
                </div>}
                <div className="cards">
                    {cards.map(item => {
                        return <Card key={item._id} product={item} user={user} operationFavorite={operationFavorite}/>;
                    })}
                </div>
            </div>
        </div>
    )
}