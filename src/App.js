import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from './Components/NavBar';
import TrendingMovies from './Components/TrendingMovies';
import Pagination from './Components/Pagination';
import WatchList from './Components/WatchList';
import { MovieContext } from './Components/MovieContext';

function App() {

  const [watchList, setWatchList] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  function handlePrev(){
      if(pageNo > 1){
          setPageNo(pageNo - 1);
      }
  }

  function handleNext(){
      setPageNo(pageNo + 1);
  }

  useEffect(() => {
      let watchListFromLocalStorage = JSON.parse(localStorage.getItem('watchList'));
      if(watchListFromLocalStorage === null){
        return;
      }
      setWatchList(watchListFromLocalStorage);
  }, [])

  const handleAddWatchList = (movieObj) => {
      // watchList.push(id);
      // const newWatchList = [...watchList];
      const newWatchList = [...watchList, movieObj];
      localStorage.setItem('watchList', JSON.stringify(newWatchList));
      setWatchList(newWatchList);
  }

  const handleRemoveWatchList = (movieObj) => {
    const newWatchList = watchList.filter((movie) => {
        return movie.id !== movieObj.id;
    })
    localStorage.setItem('watchList', JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  }

  return (
    <BrowserRouter>
        <MovieContext.Provider value={{watchList, setWatchList, handleAddWatchList, 
                                        handleRemoveWatchList, pageNo, handlePrev, handleNext}}>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>

          <Route path='/watchlist' element={<WatchList />}></Route>
        </Routes>
        </MovieContext.Provider>
    </BrowserRouter>
  );
}

export default App;
