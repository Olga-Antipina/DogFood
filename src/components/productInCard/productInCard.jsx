import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './productInCard.css'
import { ReactComponent as Arrow } from './img/arrow.svg'
import { ReactComponent as Star } from './img/star.svg'
import { ReactComponent as Like } from './img/like.svg'
import { ReactComponent as Truck } from './img/truck.svg'
import { ReactComponent as Ribbon } from './img/ribbon.svg'
import { Reviews } from "../reviews/reviews";
import { UserContext } from "../../context/userContext";
import { NewReview } from "../forms/newReview";


export const ProductInCard = ({ product, isItInFavorite, reviews, setReviews }) => {

    const user = useContext(UserContext);
    const [isLikedProduct, setIsProductLike] = useState(false);
    const [formReview, setFormReview] = useState(false);

    const newReview = () => {
        setFormReview(!formReview);
    }

    const handleClick = () => {
        if (product.likes !== undefined) {
            isItInFavorite(product, isLikedProduct);
        }
    }
    useEffect(() => {
        if (product.likes !== undefined) {
            const isLiked = product.likes.includes(user._id);
            setIsProductLike(isLiked)
        }
    }, [product.likes, user._id]);

    const quantityReviewsEnding = () => {
        if (!!reviews) {
            if (reviews.length % 10 === 0) {
                return 'ов';
            } else if (reviews.length > 4 && reviews.length < 20) {
                return 'ов';
            } else if (reviews.length % 10 > 1 && reviews.length % 10 < 5) {
                return 'а';
            } else if (reviews.length % 10 > 4 && reviews.length % 10 < 9) {
                return 'ов';
            }
        }
    }

    const handleScrollClick = (event) => {
        event.preventDefault();
        const hiddenElement = document.querySelector("#reviews");
        hiddenElement.scrollIntoView({ behavior: "smooth" });
    }

    const starsOfRating = () => {
        const keyOfStars = ['1', '2', '3', '4', '5'];
        const stars = keyOfStars.map((el) => {
            if (!reviews || !reviews.length) {
                return (<Star key={el} className="productInCard__stars__grey" />)
            } else {
                const middleRating = reviews.reduce((previousValue, currentValue) => previousValue += currentValue.rating, 0);
                const finishRating = Math.round(middleRating / reviews.length);
                if (el <= finishRating) {
                    return (<Star key={el} className="productInCard__stars__fill" />);
                } else {
                    return (<Star key={el} className="productInCard__stars__grey" />);
                }
            }
        })
        return stars;
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
                    <div className="productInCard__stars">
                        {starsOfRating()}
                    </div>&nbsp;&nbsp;
                    <div className="productInCard__reviews"><a href="#reviews" onClick={handleScrollClick}>{!!reviews && reviews.length}&nbsp;отзыв{quantityReviewsEnding()}</a></div>
                </div>
                <div className="productInCard__img">
                    <img alt="Изображение товара" src={product.pictures} className="productInCard__img__picture" />
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
                    <button onClick={handleClick} className="productInCard__card__favorite">
                        <Like className={`${product.likes !== undefined && isLikedProduct ? 'productInCard__card__liked' : 'productInCard__card__disliked'}`} />
                        <span className="productInCard__inFavorites">&nbsp;&nbsp;{product.likes !== undefined && isLikedProduct ? 'В избранном' : 'В избранное'}</span>
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
                <div className="productInCard__table">
                    <div>
                        <div className="productInCard__nameRow productInCard__tr">Количество</div>
                        <div className="productInCard__nameRow productInCard__tr">Цена</div>
                        <div className="productInCard__nameRow productInCard__tr">Наличие на складе</div>
                    </div>
                    <div>
                        <div className="productInCard__td">{String(product.wight)}</div>
                        <div className="productInCard__td">{String(product.price)} рублей</div>
                        {!!product.stock ? <div className="productInCard__td">{String(product.stock)} штук</div> : <div className="productInCard__td">Товар временно отсутствует</div>}
                    </div>
                </div>
                <div className="productInCard__reviews__container" id="reviews">
                    <div className="productInCard__reviews__title">Отзывы</div>
                    <span className="productInCard__button__review" onClick={newReview}>{formReview ? "Закрыть форму" : "Написать отзыв"}</span>
                    {formReview && <NewReview reviews={reviews} setReviews={setReviews} />}
                    <hr className="productInCard__line"></hr>
                    {product.reviews !== undefined && !!product.reviews.length
                        ? <Reviews product={product} reviews={reviews} setReviews={setReviews} />
                        : <div className="productInCard__reviews__zero">Отзывы на данный товар отсутствуют</div>}
                </div>
            </div>
        </div>
    )
}