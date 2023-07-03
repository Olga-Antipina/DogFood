import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { api } from './utils/api';
import { useDebounce } from './hooks/hooks';
import { Route, Routes, useNavigate } from 'react-router';
import { OpenCard } from './pages/openCard/openCard'
import { Catalog } from './pages/catalog/catalog';
import { Favorites } from './pages/favorites/favorites';
import { Cart } from './pages/cart/cart';
import { Profile } from './pages/profile/profile';
import { Error404 } from './pages/error404/error404';
import { UserContext } from './context/userContext';
import { FormRegister } from './components/forms/register';
import { FormAuthorization } from './components/forms/authorization';
import { FormNewPassword } from './components/forms/newPassword';
import { EnterWithFormNewPassword } from './components/forms/enterWithNewPassword';
import { FAQ } from './pages/FAQ/FAQ';


function App() {

  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});
  const [favoritesProducts, setFavoritesProducts] = useState([]);
  const [authorization, setAuthorization] = useState(false);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

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
      ? setFavoritesProducts(state => state.filter(fav => fav._id !== updatedCard._id))
      : setFavoritesProducts(state => [updatedCard, ...state]);
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
      .catch((error) => console.log('ОШИБКА', error));
  }, [debounceValueInApp]);

  useEffect(() => {
    if (authorization) {
    Promise.all([api.getUserInfo(), api.getProductList()])
      .then(([userData, productData]) => {
        setUser(userData);
        const filteredProducts = filteredCards(productData.products);
        setCards(filteredProducts);
        const favoritesFiltered = filteredProducts.filter(item => item.likes.includes(userData._id));
        setFavoritesProducts(favoritesFiltered);
      })
      .catch((error) => console.log('ОШИБКА', error));
    }
  }, [authorization]);

  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      setAuthorization(true);
    }
  }, []);

  const exit = useCallback(() => {
    localStorage.removeItem('token');
    setAuthorization(!!localStorage.getItem('token'))
    navigate('/');
  }, [])


  return (
    <div className="app">
      <UserContext.Provider value={user}>
        {authorization ?
          <main>
            <Header setSearch={setSearch} favoritesProducts={favoritesProducts} exit={exit} />
            <Routes>
              <Route path='/' element={<Catalog cards={cards} operationFavorite={operationFavoriteProduct} debounceValueInApp={debounceValueInApp} sortCards={sortCards} />} />
              <Route path='/opencard/:id' element={<OpenCard operationFavorite={operationFavoriteProduct} reviews={reviews} setReviews={setReviews}/>} />
              <Route path='/favorites' element={<Favorites favoritesProducts={favoritesProducts} operationFavorite={operationFavoriteProduct} />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/profile' element={<Profile setUser={setUser} />} />
              <Route path='/FAQ' element={<FAQ />} />
              <Route path='*' element={<Error404 />} />
            </Routes>
            <Footer />
          </main>
          :
          <main>
            <Routes>
              <Route path='/' element={<FormRegister authorization={authorization} setAuthorization={setAuthorization} />} />
              <Route path='/authorization' element={<FormAuthorization authorization={authorization} setAuthorization={setAuthorization} />} />
              <Route path='/new_password' element={<FormNewPassword authorization={authorization} setAuthorization={setAuthorization} />} />
              <Route path='/enterWithNewPassword' element={<EnterWithFormNewPassword authorization={authorization} setAuthorization={setAuthorization} />} />
              <Route path='*' element={<Error404 />} />
            </Routes>
          </main>
        }
      </UserContext.Provider>
    </div>
  );
}

export default App;
