import React from "react"
import { Card } from "../card/card"
import "./cardlist.css"

export const Cardlist = ({ cards, operationFavorite }) => {
    return (
        <div className="cards">
            {cards.map(item => {
                return <Card key={item._id} product={item} operationFavorite={operationFavorite} />;
            })}
        </div>
    )
}