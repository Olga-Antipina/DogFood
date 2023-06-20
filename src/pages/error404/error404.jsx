import React from "react";
import './error404.css'
import { ReactComponent as SadFase } from './img/sadFace.svg'

export const Error404 = () => {
    return (
        <div className="error404__container">
            <div className="error404__img"><SadFase /></div>
            <div className="error404__message">Что-то пошло не так... ERROR 404</div>
            <div className="error404__button"><a href="/">На главную</a></div>
        </div>
    )
}