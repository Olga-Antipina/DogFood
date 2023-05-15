import React from "react";
import { Cardlist } from "../../components/cardlist/cardlist";

export const Catalog = ({cards, user, operationFavorite, debounceValueInApp, sortCards}) => {
    return (<Cardlist cards={cards} user={user} operationFavorite={operationFavorite} debounceValueInApp={debounceValueInApp} sortCards={sortCards} />)
}