import React, { useContext } from "react";
import "./card.css"
import { ReactComponent as Like } from "./img/like.svg"
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const Card = ({product, operationFavorite}) => {

    const user = useContext(UserContext);

    const isLiked = product.likes.includes(user._id);

    const isItInFavorite = () => {
        operationFavorite(product, isLiked);
    };

    return (
        <div className="card">
            <div className="card__sticky card__sticky_type_top-left">                
                {!!product.discount && <span className="card__discount">-{product.discount}%</span>}
                {!!product.tags.includes("new") && <span className="tag tag_type_new">New</span>}
                {!!product.tags.includes("sale") && <span className="tag tag_type_sale">Sale</span>}
            </div>
            <div className="card__sticky card__sticky_type_top-right">
                <button onClick={isItInFavorite} className="card__favorite">                    
                    <Like className={`${isLiked ? 'card__liked' : 'card__disliked'}`}/>
                </button>
            </div>
            <Link to={`/opencard/${product._id}`} className="card__link">
                <img src={product.pictures} alt="food" className="card__image"/>
                
                {!!product.discount ? <span className="card__old-price">{product.price} ₽</span> : <span className="card__old-price"></span>}                
                {!!product.discount ? <span className="card__price card__price_type_discount">{Math.round((product.price - product.price/100*product.discount)/5)*5} ₽</span> : <span className="card__price">{product.price} ₽</span>}  
                
                <span className="card__weight">{product.wight}</span>
                <p className="card__name">{product.name}</p>
            </Link>
            <span className="card__cart btn btn_type_primary">В корзину</span>
        </div>
    )
}