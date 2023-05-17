import React from "react";
import './favorites.css'
import { Link } from "react-router-dom";
import { Cardlist } from "../../components/cardlist/cardlist";
import { ReactComponent as Arrow } from './img/arrow.svg'


export const Favorites = ({ favoritesProducts, operationFavorite }) => {

    return (
        <div className="favorites">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="favorites__goHome"><Arrow />&nbsp;&nbsp;В каталог</div>
            </Link>
            {!!favoritesProducts.length
                ?
                <div>
                    <div className="favorites__title">Избранное</div>
                    <Cardlist cards={favoritesProducts} operationFavorite={operationFavorite} />
                </div>
                :
                <div className="favorites__zero">
                    <div className="favorites__title">Товары в избранном отсутствуют</div>
                </div>
            }
        </div>
    )
}