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


function App() {

  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});


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
      // ПЕРВОНАЧАЛЬНЫЙ КОД ДЛЯ ПРИМЕРА (позже будет удалён)
      // const newCards = cards;
      // for (let i of newCards) {
      //   if (!!i.tags.includes("new")) {
      //     let index = newCards.indexOf(i);
      //     newCards.splice(index, 1);
      //     newCards.splice(0, 0, i);
      //   }
      // }
    } else if (event.target.textContent === 'По рейтингу') {
      // Код для отображения рейтинга не работает, не могу понять, почему (не рассчитывает рейтинг - среднее арифметическое всех оценок)
      const averageValue = (arr) => arr.reduce((previousValue, currentValue) => {
        previousValue += currentValue.rating;
        return previousValue/(arr.length);
      }, 0);
      const newCards = cards.sort((a, b) => averageValue(b.reviews)-averageValue(a.reviews));
      setCards([...newCards]);
    } else if (event.target.textContent === 'Популярные') {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
    }
  }


  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    api.searchProducts(debounceValueInApp).then((data) => setCards(filteredCards(data)));
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(([userData, productData]) => {
      setUser(userData);
      setCards(filteredCards(productData.products));
    });
  }, []);


  return (
    <div className="app">
      <Header setSearch={setSearch}/>
      
      <Routes>
        <Route path='/' element={<Catalog cards={cards} user={user} operationFavorite={operationFavoriteProduct} debounceValueInApp={debounceValueInApp} sortCards={sortCards}/>} />
        <Route path='/opencard/:id' element={<OpenCard user={user}/>} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Error404 />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
