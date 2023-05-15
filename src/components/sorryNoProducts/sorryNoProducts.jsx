import React from "react"
import './sorryNoProducts.css'
import { ReactComponent as SadFase } from './img/sadFace.svg'


export const SorryNoProducts = ({debounceValueInApp}) => {
    return (
        <div className="sorryNoProducts">
            <div className="sorryNoProducts__search">По запросу <span className="sorryNoProducts__search__value">{debounceValueInApp}</span> найдено 0 товаров</div>
            <div className="sorryNoProducts__container">
                <div className="sorryNoProducts__img"><SadFase/></div>
                <div className="sorryNoProducts__message">Простите, по вашему запросу товары не найдены...</div>
                <div className="sorryNoProducts__button"><a href="/">В каталог</a></div>
            </div>
        </div>
    )
}
