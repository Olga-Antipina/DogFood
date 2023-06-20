import React, { useCallback, useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useParams } from "react-router";
import { ProductInCard } from "../../components/productInCard/productInCard";
import { UserContext } from "../../context/userContext";

export const OpenCard = ({ operationFavorite, reviews, setReviews }) => {

    const user = useContext(UserContext);

    const [product, setProduct] = useState({});
    const { id } = useParams();

    const isItInFavorite = useCallback(async (product, isLiked) => {
        if (product.likes !== undefined) {
            const wasLiked = await operationFavorite(product, isLiked);
            if (wasLiked) {
                const filteredLikes = product.likes.filter(e => e !== user?._id);
                setProduct((s) => ({ ...s, likes: filteredLikes }))
            } else {
                const addLikes = [...product.likes, user?._id];
                setProduct((s) => ({ ...s, likes: addLikes }))
            }
        }
    }, [operationFavorite, user?._id]);

    
    useEffect(() => {
        if (id) {
            api.getProductId(id)
            .then((data) => {
                setProduct(data);
            })
            .catch((error)=>console.log('ОШИБКА', error));
        }
    }, [id]);

    return (
        <div className="openCard">
            <ProductInCard product={product} isItInFavorite={isItInFavorite} reviews={reviews} setReviews={setReviews}/>
        </div>
    );
};