import React from "react";
import "./card.css"
import { ReactComponent as Like } from "./img/like.svg"
import { api } from "../../utils/api";

export const Card = ({product, userId, operationFavorite}) => {

    const isLiked = product.likes.includes(userId);

    const isItInFavorite = () => {
        operationFavorite(product, isLiked);
        // api.likeOrDislike(product._id, isLiked);
    //     // api.getUserInfo().then((res) => {
    //     //     if (product.likes.includes(res._id) === false) {
    //     //         api.likeThisProduct(product._id);
    //     //     } else if (product.likes.includes(res._id) === true) {
    //     //         api.dislikeThisProduct(product._id);
    //     //     };            
    //     });
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
            <a href="/" className="card__link">
                <img src={product.pictures} alt="food" className="card__image"/>
                
                {!!product.discount ? <span className="card__old-price">{Math.round(product.price + product.price/100*product.discount)} ₽</span> : <span className="card__old-price"></span>}                
                {!!product.discount ? <span className="card__price card__price_type_discount">{product.price} ₽</span> : <span className="card__price">{product.price} ₽</span>}  
                
                <span className="card__weight">{product.wight}</span>
                <p className="card__name">{product.name}</p>
            </a>
            <span className="card__cart btn btn_type_primary">В корзину</span>
        </div>
    )
}