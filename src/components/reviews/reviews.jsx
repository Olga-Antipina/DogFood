import React from "react";
import './reviews.css'

export const Reviews = ({ product }) => {
    if (!!product.reviews) {

        return (product.reviews.map((item) => <div key={item._id}>
            <div className="reviews__firstInfo">
                <span className="reviews__name">{item.author.name}</span>
                <span className="reviews__date">{new Date(item.updated_at).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })}</span>
            </div>
            <div className="reviews__rating">{item.rating}</div>
            <div className="reviews__text">{item.text}</div>
            <hr className="reviews__line"></hr>
        </div>))
    }
}
