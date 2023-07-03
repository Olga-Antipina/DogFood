import React from "react";
import './FAQ.css'
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from '../../components/productInCard/img/arrow.svg';


export const FAQ = () => {

    const openThisData = (event) => {
        if (event.target.classList.contains('FAQ__question')) {
            // setOpenData(!openData);
            event.target.lastElementChild.classList.toggle('acc');
        }
        if (event.target.lastElementChild.classList.contains('acc')) {
            event.target.firstElementChild.textContent = "-";
        } else {
            event.target.firstElementChild.textContent = "+";
        }
    };

    return (
        <div className="FAQ">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="FAQ__goHome"><Arrow />&nbsp;&nbsp;В каталог</div>
            </Link>
            <div className="FAQ__title">Часто спрашивают</div>


            <div className="FAQ__question" onClick={openThisData}>
                <span className="FAQ__flag">+</span>
                &nbsp;&nbsp;У вас крутые товары?
                <div className="FAQ__answer">Очень.</div>
            </div>
            <hr className="FAQ__line"></hr>


            <div className="FAQ__question" onClick={openThisData}>
                <span className="FAQ__flag">+</span>
                &nbsp;&nbsp;А в магазине продаются скрипки?
                <div className="FAQ__answer">Нет.</div>
            </div>
            <hr className="FAQ__line"></hr>


            <div className="FAQ__question" onClick={openThisData}>
                <span className="FAQ__flag">+</span>
                &nbsp;&nbsp;Почему тут не продаются скрипки?
                <div className="FAQ__answer">Так исторически сложилось...</div>
            </div>
            <hr className="FAQ__line"></hr>


            <div className="FAQ__question" onClick={openThisData}>
                <span className="FAQ__flag">+</span>
                &nbsp;&nbsp;А что самое вкусное?
                <div className="FAQ__answer">Кругля, конечно же.
                </div>
            </div>
            <hr className="FAQ__line"></hr>
        </div>
    )
}