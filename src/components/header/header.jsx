import React from "react"
import './header.css'
import { ReactComponent as Logo } from './img/logo.svg'
import { ReactComponent as FavoritesIcon } from './img/favorites_icon.svg'
import { ReactComponent as CartIcon } from './img/cart_icon.svg'
import { ReactComponent as ProfileIcon } from './img/profile_icon.svg'
import { ReactComponent as ExitIcon } from './img/exit.svg'
import { Search } from "../search/search"
import { Link, useLocation } from "react-router-dom"

export const Header = (props) => {

    const setSearchQuery = (path) => {
        props.setSearch(path);
    }
    const location = useLocation();    

    
    return <header>
        <div className="container">
            <div className="header__wrapper">
            <a href="/"><Logo className="header__logo"/></a>
                {location.pathname === "/" ? <Search setSearch={setSearchQuery}/> : <div className="header__message">Крафтовые лакомства для собак!</div>}
                <div className="header_icons">
                    <Link to="/favorites"><FavoritesIcon title="Избранное" /></Link>{!!props.favoritesProducts.length && <span className="header__likes">{props.favoritesProducts.length}</span>}
                    <Link to="/cart"><CartIcon title="Корзина" /></Link>
                    <Link to="/profile"><ProfileIcon title="Профиль" /></Link>
                    <ExitIcon title="Выход" onClick={props.exit}/>
                </div>
            </div>
        </div>
    </header>
}