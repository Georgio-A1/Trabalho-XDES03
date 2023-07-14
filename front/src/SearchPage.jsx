import React, { useEffect, useState } from 'react';
import GameBox from './GameBox';
import { useParams } from 'react-router-dom';

function SearchPage() {
  const { genre } = useParams();
  const [games, setGames] = useState([]);
 // console.log(genre)

  useEffect(() => {
   // console.log(genre)
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/genre/${genre}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
       // console.log(data)
        if (Array.isArray(data)) {
          setGames(data);
        } else {
          console.error('Data fetched is not an array:', data);
        }
      } catch (error) {
        console.log('Error fetching game data:', error);
      }
    };

    fetchData();
  }, [genre]);

  return (
    <div>
      <h2 className='search-result'>Resultados de busca para: {genre}</h2>
      <div className="game-boxes">
      {games.map((game, index) => (
        <GameBox key={index} game={game}/>
      ))}
      </div>
    </div>
  );
}

export default SearchPage;
