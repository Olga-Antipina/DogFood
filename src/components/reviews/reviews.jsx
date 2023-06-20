import React, { useContext, useEffect } from "react";
import './reviews.css'
import { ReactComponent as Star } from '../productInCard/img/star.svg'
import { ReactComponent as DeleteReview } from './img/deleteReview.svg'
import { UserContext } from "../../context/userContext";
import { api } from "../../utils/api";


export const Reviews = ({ product, reviews, setReviews }) => {

    const user = useContext(UserContext);

    const starsOfRating = (rating) => {
        const keyOfStars = ['1', '2', '3', '4', '5'];
        const stars = keyOfStars.map((el) => {
            if (el <= rating) {
                return (<Star key={el} className="productInCard__stars__fill" />);
            } else {
                return (<Star key={el} className="productInCard__stars__grey" />);
            }
        });
        return stars;
    }

    useEffect(() => {
        api.getThisProductReview(product._id)
            .then((data) => {
                setReviews(data.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)));
            })
            .catch((error) => console.log('ОШИБКА', error));
    }, [product._id, setReviews]);

    const deleteReview = async (productId, reviewId) => {
        await api.deleteProductReview(productId, reviewId)
            .then((res) => {
                if (res.err) {
                    alert("ОШИБКА " + res.err.statusCode + ": " + res.message);
                } else {
                    setReviews(res.reviews.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)));
                }
            })
    }


    if (!!reviews) {
        return (reviews.map((item) => <div key={item._id}>
            <div className="reviews__firstInfo">
                <span className="reviews__name">{item.author.name}</span>
                <span className="reviews__date">{new Date(item.updated_at).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })}</span>
                {item.author._id === user._id && <DeleteReview title="Удалить отзыв" className="reviews__deleteReview" onClick={() => deleteReview(product._id, item._id)}/>}
            </div>
            <div className="reviews__rating">{starsOfRating(item.rating)}</div>
            <div className="reviews__text">{item.text}</div>
            <hr className="reviews__line"></hr>
        </div>))
    }
}
