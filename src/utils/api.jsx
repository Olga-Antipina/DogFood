const onRes = (res) => {
    return res.json();
}

class Api {
    constructor(data) {
        this.baseUrl = data.baseUrl;
        this.headers = data.headers;
    }

    getProductList() {
        return fetch(`${this.baseUrl}/products`, {
            method: 'GET',
            headers: this.headers
        }).then(onRes);
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        }).then(onRes);
    }

    searchProducts(path) {
        return fetch(`${this.baseUrl}/products/search?query=${path}`, {
            method: 'GET',
            headers: this.headers
        }).then(onRes);
    }

    likeThisProduct(productId) {
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: 'PUT',
            headers: this.headers
        }).then(onRes);
    }

    dislikeThisProduct(productId) {
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: 'DELETE',
            headers: this.headers
        }).then(onRes);
    }

    likeOrDislike(productId, isLiked) {
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this.headers
        }).then(onRes);
    }

    getProductId(id) {
        return fetch(`${this.baseUrl}/products/${id}`, {
            method: 'GET',
            headers: this.headers
        }).then(onRes);
    }

    createNewProduct(product) {
        return fetch(`${this.baseUrl}/products`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(product)
        }).then(onRes);
    }

    updateProduct(productId) {
        return fetch(`${this.baseUrl}/products/${productId}`, {
            method: 'PATCH',
            headers: this.headers,
            // body: JSON.stringify(product)
        }).then(onRes);
    }

    deleteProduct(productId) {
        return fetch(`${this.baseUrl}/products/${productId}`, {
            method: 'DELETE',
            headers: this.headers
        }).then(onRes);
    }

    addProductReview(productId) {
        return fetch(`${this.baseUrl}/products/review/${productId}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(productId)
        }).then(onRes);
    }

    deleteProductReview(productId, reviewId) {
        return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(onRes);
    }

    getAllProductReviews() {
        return fetch(`${this.baseUrl}/products/review`, {
            method: 'GET',
            headers: this.headers,
        }).then(onRes);
    }

    getThisProductReview(productId) {
        return fetch(`${this.baseUrl}/products/review/${productId}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onRes);
    }
}

const config = {
    baseUrl: "https://api.react-learning.ru",
    headers: {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ3YjIwYThmYmM0NzNmYTg5ZDRiOTYiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyNDI4NzA1LCJleHAiOjE3MTM5NjQ3MDV9.6o0ezfHUP2u8gbrShDsjjoBANKkjIB_iOQA1Kv4AaBw",
        "Content-Type": "application/json",
    },
}

export const api = new Api(config);

