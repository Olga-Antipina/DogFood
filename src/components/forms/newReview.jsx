import React from "react";
import { ReactComponent as Star } from '../productInCard/img/star.svg'
import { useForm } from "react-hook-form"
import { api } from "../../utils/api";
import { useParams } from "react-router";
import './newReview.css'

export const NewReview = ({ setReviews }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();

    const sendData = async (text) => {
        await api.addProductReview(id, text)
            .then((res) => {
                if (res.err) {
                    alert("ОШИБКА " + res.err.statusCode + ": " + res.message);
                } else {
                    setReviews(res.reviews.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)));
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(sendData)}>
                <div className="rating-area">
                    <label htmlFor="star-1" className="form-radio-hidden">
                        <input type="radio" {...register('rating', { required: "Поставьте товару оценку" })} id="star-1" value={1} />
                        <Star className="review__stars" />
                    </label>
                    <label htmlFor="star-2" className="form-radio-hidden">
                        <input type="radio" {...register('rating', { required: "Поставьте товару оценку" })} id="star-2" value={2} />
                        <Star className="review__stars" />
                    </label>
                    <label htmlFor="star-3" className="form-radio-hidden">
                        <input type="radio" {...register('rating', { required: "Поставьте товару оценку" })} id="star-3" value={3} />
                        <Star className="review__stars" />
                    </label>
                    <label htmlFor="star-4" className="form-radio-hidden">
                        <input type="radio" {...register('rating', { required: "Поставьте товару оценку" })} id="star-4" value={4} />
                        <Star className="review__stars" />
                    </label>
                    <label htmlFor="star-5" className="form-radio-hidden">
                        <input type="radio" {...register('rating', { required: "Поставьте товару оценку" })} id="star-5" value={5} />
                        <Star className="review__stars" />
                    </label>
                    {errors?.rating ? <div className="errors__review">{errors?.rating.message}</div> : <div className="errors__review"></div>}
                </div>
                <textarea className="text__review" {...register('text', { required: "Напишите отзыв к товару" })} placeholder="Ваш отзыв..."></textarea>
                {errors?.text ? <div className="errors__review">{errors?.text.message}</div> : <div className="errors__review"></div>}

                <button type="submit" className="button__review">Отправить отзыв</button>
            </form>
        </div>
    )
}