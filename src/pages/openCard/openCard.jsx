import React, { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useParams } from "react-router";
import { ProductInCard } from "../../components/productInCard/productInCard";
import { UserContext } from "../../context/userContext";

export const OpenCard = () => {

    const user = useContext(UserContext);
    console.log(user);

    const [product, setProduct] = useState({});
    const {id} = useParams();

    // Статус лайка в каталоге не актуализируется, если вернуться в каталог без загрузки страницы каталога. Не могу понять, почему, уже сетила в App, ставила флаг, отслеживала карточки тоже, прокидывала пропсы, ничего не помогает
    const operationFavoriteInCard = async (product, isLiked) => {
        const updatedCard = await api.likeOrDislike(product._id, isLiked);
        setProduct(updatedCard);
    }
    const isItInFavorite = () => {
        if (product.likes !== undefined) {
            operationFavoriteInCard(product, product.likes.includes(user._id));
        }
    };

    
    useEffect (() => {
        if (id) {
            api.getProductId(id).then((data) => {
                setProduct(data);
            });
        }        
    }, [id]);

    return (
        <div className="openCard">
            <ProductInCard product={product} isItInFavorite={isItInFavorite}/>
        </div>
    );
};