import React, { useEffect, useState } from 'react';
import './App.css';
import { Cardlist } from './components/cardlist/cardlist';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
// import data from "./data/data.json"
import { api } from './utils/api';
import { useDebounce } from './hooks/hooks';


function App() {

  // const [hook, setHook] = useState(0);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});

  const filteredCards = (cards) => {
    return cards.filter(e => e.author._id === '622bd81b06c7d323b8ae4614' || e.author._id === '6447b20a8fbc473fa89d4b96')
  }

  const debounceValueInApp = useDebounce(search);

  const operationFavoriteProduct = async (product, isLiked) => {
    const updatedCard = await api.likeOrDislike(product._id, isLiked);
    // const newCards = cards.map(elem => elem._id === updatedCard._id ? updatedCard : elem);

    const foundIndexOfElem = cards.findIndex(elem => elem._id === updatedCard._id);
    if (foundIndexOfElem !== -1) {
      setCards(state => [...state.slice(0, foundIndexOfElem), updatedCard, ...state.slice(foundIndexOfElem + 1)]);
    }
    // setCards([...newCards]);

    // const deleteCardWithoutLike = () => {
    //   const newCards = cards.map(elem => elem._id === updatedCard._id ? updatedCard : elem);
    //   setCards([...newCards]);
    // }
    // const addCardWithLike = () => {
    //   const newCards = cards.map(elem => elem._id === updatedCard._id ? updatedCard : elem);
    //   setCards([...newCards]);
    // }
    // isLiked ? deleteCardWithoutLike() : addCardWithLike();
  }


  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    api.searchProducts(debounceValueInApp).then((data) => setCards(filteredCards(data)));
    // const filtered = cards.filter(e => e.name.toLocaleLowerCase().includes(search.toLowerCase()));
    // setCards(filtered);
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(([userData, productData]) => {
      setUser(userData);
      setCards(filteredCards(productData.products));
    });
    // api.getProductList().then(data => setCards(data.products));
    // api.getUserInfo().then(data => setUser(data));
  }, []);

  return (
    <div className="app">
      <Header setSearch={setSearch}/>
      <Cardlist cards={cards} userId={user._id} operationFavorite={operationFavoriteProduct}/>
      <Footer />
    </div>
  );
}

export default App;
