const onRes = (res) => {
    return res.json();
}


class Api {
    constructor(data, newHeadersConfig) {
        this.baseUrl = data.baseUrl;
        this.headers = data.headers;
        this.newHeadersConfig = newHeadersConfig;
    }

    getProductList() {
        return fetch(`${this.baseUrl}/products`, {
            method: 'GET',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    searchProducts(path) {
        return fetch(`${this.baseUrl}/products/search?query=${path}`, {
            method: 'GET',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    likeThisProduct(productId) { // не понадобилось
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: 'PUT',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    dislikeThisProduct(productId) { // не понадобилось
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: 'DELETE',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    likeOrDislike(productId, isLiked) {
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    getProductId(id) {
        return fetch(`${this.baseUrl}/products/${id}`, {
            method: 'GET',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    createNewProduct(product) { // не понадобилось
        return fetch(`${this.baseUrl}/products`, {
            method: 'POST',
            ...this.newHeadersConfig(),
            body: JSON.stringify(product)
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    updateProduct(productId) { // не понадобилось
        return fetch(`${this.baseUrl}/products/${productId}`, {
            method: 'PATCH',
            ...this.newHeadersConfig()
            // body: JSON.stringify(product) ИСПРАВИТЬ!
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    deleteProduct(productId) { // не понадобилось
        return fetch(`${this.baseUrl}/products/${productId}`, {
            method: 'DELETE',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    addProductReview(productId, text) {
        return fetch(`${this.baseUrl}/products/review/${productId}`, {
            method: 'POST',
            ...this.newHeadersConfig(),
            body: JSON.stringify(text)
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    deleteProductReview(productId, reviewId) {
        return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
            method: 'DELETE',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    getAllProductReviews() { // не понадобилось
        return fetch(`${this.baseUrl}/products/review`, {
            method: 'GET',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    getThisProductReview(productId) {
        return fetch(`${this.baseUrl}/products/review/${productId}`, {
            method: 'GET',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    register(data) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    authorization(data) {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            ...this.newHeadersConfig(),
            body: JSON.stringify(data)
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    newPassword(data) {
        return fetch(`${this.baseUrl}/forgot-password`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    enterWithNewPassword(data) {
        return fetch(`${this.baseUrl}/password-reset/${data.token}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data, ["password"])
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    isValidToken() { // не понадобилось
        return fetch(`${this.baseUrl}/v2/group-12/users/me`, {
            method: 'GET',
            ...this.newHeadersConfig()
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    editUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            ...this.newHeadersConfig(),
            body: JSON.stringify(data)
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

    editUserAvatar(link) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            ...this.newHeadersConfig(),
            body: JSON.stringify(link)
        }).then(onRes).catch((error) => console.log('ОШИБКА', error));
    }

}


const newHeadersConfig = () => {
    return {
        headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
        },
    }
}

const config = {
    baseUrl: "https://api.react-learning.ru",
    headers: {
        "Content-Type": "application/json",
    },
}

export const api = new Api(config, newHeadersConfig);

