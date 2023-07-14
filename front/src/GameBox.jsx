import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GameContext from './GameContext';
import { useContext } from 'react';

function GameBox({ game }) {
  //console.log('Cover:', game.cover);
  //console.log('Type:', typeof game.cover);
  const imageUrl = game.cover && game.cover.toString().startsWith('//') ? `https:${game.cover}` : game.cover;
  const gameBoxRef = useRef(null); // reference to the 'game-box' div
  const { setGame } = useContext(GameContext);

  const handleClick = () => {
    setGame(game);
  };

  // console.log(game);

  useEffect(() => {
    if (gameBoxRef.current) {
      const images = gameBoxRef.current.getElementsByTagName('img');
      if (images.length > 1) {
        // if more than one image, remove the second one
        gameBoxRef.current.removeChild(images[1]);
      }
    }
  }, [game]);

  return (
    <div className="game-box">
      <img src={imageUrl} alt={game.name} />
      <Link  onClick={handleClick}
        to={{
          pathname: `/game/${game.id}`,
          state: { game },
        }}
      >
        <p>{game.name}</p>
      </Link>
    </div>
  );
}

export default GameBox;
