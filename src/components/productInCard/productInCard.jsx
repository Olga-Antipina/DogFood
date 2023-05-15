import React from "react";
import { Link } from "react-router-dom";
import './productInCard.css'
import { ReactComponent as Arrow } from './img/arrow.svg'
import { ReactComponent as Star } from './img/star.svg'
import { ReactComponent as Like } from './img/like.svg'
import { ReactComponent as Truck } from './img/truck.svg'
import { ReactComponent as Ribbon } from './img/ribbon.svg'
import { Reviews } from "../reviews/reviews";


export const ProductInCard = ({ product, user, isItInFavorite }) => {

    const quantityReviewsEnding = () => {
        if (!!product.reviews) {
            if (product.reviews.length % 10 === 0) {
                return 'ов';
            } else if (product.reviews.length > 4 && product.reviews.length < 20) {
                return 'ов';
            } else if (product.reviews.length % 10 > 1 && product.reviews.length % 10 < 5) {
                return 'а';
            } else if (product.reviews.length % 10 > 4 && product.reviews.length % 10 < 9) {
                return 'ов';
            }
        }
    }

    const handleScrollClick = (event) => {
        event.preventDefault();
        const hiddenElement = document.querySelector("#reviews");
        hiddenElement.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="productInCard">
            <div>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className="productInCard__goHome"><Arrow />&nbsp;&nbsp;В каталог</div>
                </Link>
                <div className="productInCard__title">{product.name}</div>
                <div className="productInCard__rating">
                    <div>Артикул:</div>&nbsp;
                    <div className="productInCard__article__value">0000000</div>&nbsp;&nbsp;
                    <div className="productInCard__stars"><Star /><Star /><Star /><Star /><Star /></div>&nbsp;&nbsp;
                    <div className="productInCard__reviews"><a href="#reviews" onClick={handleScrollClick}>{!!product.reviews && product.reviews.length}&nbsp;отзыв{quantityReviewsEnding()}</a></div>
                </div>
                <div className="productInCard__img">
                    <img src={product.pictures} className="productInCard__img__picture" />
                    <div className="productInCard__card__sticky productInCard__card__sticky_type_top-left">
                        {!!product.discount && <span className="productInCard__card__discount">-{product.discount}%</span>}
                        {product.tags !== undefined && product.tags.includes("new") && <span className="productInCard__tag productInCard__tag_type_new">New</span>}
                        {product.tags !== undefined && product.tags.includes("sale") && <span className="productInCard__tag productInCard__tag_type_sale">Sale</span>}
                    </div>
                </div>
            </div>
            <div className="productInCard__inCart">
                {!!product.discount ? <div className="productInCard__card__old-price">{product.price} ₽</div> : <div className="productInCard__card__old-price"></div>}
                {!!product.discount ? <div className="productInCard__card__price productInCard__card__price_type_discount">{Math.round((product.price - product.price / 100 * product.discount) / 5) * 5} ₽</div> : <div className="productInCard__card__price">{product.price} ₽</div>}
                <div className="productInCard__buttons">
                    <span className="productInCard__buttons__addInCart">
                        <span>-</span>
                        <span>&nbsp;0&nbsp;</span>
                        <span>+</span>
                    </span>
                    <button className="productInCard__buttons__inCart">В корзину</button>
                </div>
                <div className="productInCard__card__sticky__like">
                    <button onClick={isItInFavorite} className="productInCard__card__favorite">
                        <Like className={`${product.likes !== undefined && product.likes.includes(user._id) ? 'productInCard__card__liked' : 'productInCard__card__disliked'}`} />
                        <span className="productInCard__inFavorites">&nbsp;&nbsp;{product.likes !== undefined && product.likes.includes(user._id) ? 'В избранном' : 'В избранное'}</span>
                    </button>
                </div>
                <div>
                    <div className="productInCard__delivery">
                        <div className="productInCard__delivery__title"><Truck />&nbsp;&nbsp;Доставка по всему Миру!</div>
                        <div className="productInCard__delivery__info">Доставка курьером — <span className="productInCard__delivery__price">от 399 ₽</span></div>
                        <div className="productInCard__delivery__info">Доставка в пункт выдачи — <span className="productInCard__delivery__price">от 199 ₽</span></div>
                    </div>
                    <div className="productInCard__warranty">
                        <div className="productInCard__warranty__title"><Ribbon />&nbsp;&nbsp;Гарантия качества</div>
                        <div className="productInCard__warranty__info">Если вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем всё возможное, чтобы удовлетворить ваши нужды.</div>
                    </div>
                </div>
            </div>
            <div className="productInCard__info">
                <div className="productInCard__description">Описание</div>
                <div className="productInCard__description__value">{product.description}</div>
                <div className="productInCard__description">Характеристики</div>
                <table>
                    <tr>
                        <td className="productInCard__nameRow">Количество</td>
                        <td>{String(product.wight)}</td>
                    </tr>
                    <tr>
                        <td className="productInCard__nameRow">Цена</td>
                        <td>{String(product.price)} рублей</td>
                    </tr>
                    <tr>
                        <td className="productInCard__nameRow">Наличие на складе</td>
                        {/*Выводится ошибка в консоли, но всё работает -- Warning: validateDOMNesting(...): <tr> cannot appear as a child of <table>. Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser. */}
                        {!!product.stock ? <td>{String(product.stock)} штук</td> : <td>Товар временно отсутствует</td>}
                    </tr>
                </table>
                <div className="productInCard__reviews__container" id="reviews">
                    <div className="productInCard__reviews__title">Отзывы</div>
                    <span className="productInCard__button__review">Написать отзыв</span>
                    <hr className="productInCard__line"></hr>
                    {product.reviews !== undefined && !!product.reviews.length ? <Reviews product={product} /> : <div className="productInCard__reviews__zero">Отзывы на данный товар отсутствуют</div>}
                </div>
            </div>
        </div>
    )
}