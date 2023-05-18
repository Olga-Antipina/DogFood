import React, { useEffect, useState } from 'react';
import './App.css';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { api } from './utils/api';
import { useDebounce } from './hooks/hooks';
import { Route, Routes } from 'react-router';
import { OpenCard } from './pages/openCard/openCard'
import { Catalog } from './pages/catalog/catalog';
import { Favorites } from './pages/favorites/favorites';
import { Cart } from './pages/cart/cart';
import { Profile } from './pages/profile/profile';
import { Error404 } from './pages/error404/error404';
import { UserContext } from './context/userContext';


function App() {

  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});
  const [favoritesProducts, setFavoritesProducts] = useState([]);


  const filteredCards = (cards) => {
    return cards.filter(e => e.author._id === '622bd81b06c7d323b8ae4614' || e.author._id === '6447b20a8fbc473fa89d4b96')
  }

  const debounceValueInApp = useDebounce(search);

  const operationFavoriteProduct = async (product, isLiked) => {
    const updatedCard = await api.likeOrDislike(product._id, isLiked);
    const foundIndexOfElem = cards.findIndex(elem => elem._id === updatedCard._id);
    if (foundIndexOfElem !== -1) {
      setCards(state => [...state.slice(0, foundIndexOfElem), updatedCard, ...state.slice(foundIndexOfElem + 1)]);
    }
    isLiked
      ? setFavoritesProducts(state => state.filter(fav => fav._id !== updatedCard._id)) //удалили продукт из списка избранного
      : setFavoritesProducts(state => [updatedCard, ...state]); //добавили продукт в избранное
    return isLiked;
  }

  const sortCards = (event) => {
    if (event.target.textContent === 'Сначала дешёвые') {
      const newCards = cards.sort((a, b) => a.price - b.price);
      setCards([...newCards]);
    } else if (event.target.textContent === 'Сначала дорогие') {
      const newCards = cards.sort((a, b) => b.price - a.price);
      setCards([...newCards]);
    } else if (event.target.textContent === 'По скидке') {
      const newCards = cards.sort((a, b) => b.discount - a.discount);
      setCards([...newCards]);
    } else if (event.target.textContent === 'Новинки') {
      const newCards = cards.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
      setCards([...newCards]);
    } else if (event.target.textContent === 'По рейтингу') {
      // Код для отображения рейтинга корректно не работает, не могу понять, почему (не рассчитывает рейтинг - среднее арифметическое всех оценок)
      const averageValue = (arr) => {
        if (!arr || !arr.length) {
          return 0;
        }
        const middleRating = arr.reduce((previousValue, currentValue) => previousValue += currentValue.rating, 0);
        return middleRating / arr.length;
      }
      const newCards = cards.sort((a, b) => averageValue(b.reviews) - averageValue(a.reviews));
      setCards([...newCards]);
    } else if (event.target.textContent === 'Популярные') {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
    }
  }


  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    api.searchProducts(debounceValueInApp)
    .then((data) => setCards(filteredCards(data)))
    .catch((error)=>console.log('ОШИБКА', error));
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()])
    .then(([userData, productData]) => {
      setUser(userData);
      const filteredProducts = filteredCards(productData.products);
      setCards(filteredProducts);
      const favoritesFiltered = filteredProducts.filter(item => item.likes.includes(userData._id));
      setFavoritesProducts(favoritesFiltered);
    })
    .catch((error)=>console.log('ОШИБКА', error));
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value={user}>
        <Header setSearch={setSearch} favoritesProducts={favoritesProducts} />
        <Routes>
          <Route path='/' element={<Catalog cards={cards} operationFavorite={operationFavoriteProduct} debounceValueInApp={debounceValueInApp} sortCards={sortCards} />} />
          <Route path='/opencard/:id' element={<OpenCard operationFavorite={operationFavoriteProduct} />} />
          <Route path='/favorites' element={<Favorites favoritesProducts={favoritesProducts} operationFavorite={operationFavoriteProduct} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
