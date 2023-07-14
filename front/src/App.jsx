import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import SearchPage from './SearchPage';
import UserSearchPage from './UserSearchPage';
import GameContext from './GameContext';
import React, { useState } from 'react';

import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [gamename, setGamename] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (gamename.trim() !== '') {
      window.location.href = `/search/${gamename}`;
      setGamename('');
    }
  };

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <Router>
        <div>
          <header>
            <form onSubmit={handleSearch} className='search-container'>
              <input
                type="text"
                id="search-input"
                placeholder="Pesquisar..."
                value={gamename}
                onChange={(e) => setGamename(e.target.value)}
              />
              <button type="submit" id='search-button'>Pesquisar</button>
            </form>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:gameId" element={<GamePage />} />
            <Route path="/search/:gamename" element={<UserSearchPage />} />
            <Route path="/genre/:genre" element={<SearchPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
          <footer>
            <p>&copy; aVAlie seus jogos favoritos</p>
            <p>&copy; 2023 grupo 4 Ltda | unifei | itajubá-MG</p>
          </footer>
        </div>
      </Router>
    </GameContext.Provider>
  );
}

export default App;