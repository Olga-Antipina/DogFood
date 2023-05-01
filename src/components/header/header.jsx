import React from "react"
import './header.css'
import { ReactComponent as Logo } from './img/logo.svg'
import { ReactComponent as FavoritesIcon } from './img/favorites_icon.svg'
import { ReactComponent as CartIcon } from './img/cart_icon.svg'
import { ReactComponent as ProfileIcon } from './img/profile_icon.svg'
import { Search } from "../search/search"

export const Header = (props) => {

    const setSearchQuery = (path) => {
        props.setSearch(path);
    }

    return <header>
        <div className="container">
            <div className="header__wrapper">
            <a href="/"><Logo className="header__logo"/></a>
                <Search setSearch={setSearchQuery}/>
                <div className="header_icons">
                    <a href="/"><FavoritesIcon /></a>
                    <a href="/"><CartIcon /></a>
                    <a href="/"><ProfileIcon /></a>
                </div>
            </div>
        </div>
    </header>
}