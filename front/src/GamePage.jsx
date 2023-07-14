import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameContext from './GameContext';
import { useContext } from 'react';

function GamePage() {
  const [ratingValue, setRatingValue] = useState(0);
  const { game } = useContext(GameContext);
  const { id } = useParams();
  const [gameData, setGameData] = useState(game || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(2);
  const [totalReviews, setTotalReviews] = useState([]);

  useEffect(() => {
    if (!gameData) {
      fetchGameData(id);
    }
  }, [id, gameData]);

  const fetchGameData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/search/${id}`);
      const data = await response.json();
      console.log(data)
      setGameData(data);
      setTotalReviews(data.reviews);
    } catch (error) {
      console.error("Failed to fetch game data", error);
    }
  };

  const displayReviews = () => {
    const start = (currentPage - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;
    const currentReviews = totalReviews.slice(start, end);

    return (
      <div id="reviews">
        {currentReviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <span className="review-user">{review.user}</span>
              <span className="review-rating">{createStarRating(review.rating)}</span>
            </div>
            <p className="review-content">{truncateContent(review.content, 40)}</p>
            <div className="review-footer">
              <span className="review-date">{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const displayPagination = () => {
    const totalPages = Math.ceil(totalReviews.length / reviewsPerPage);

    return (
      <ul id="pagination">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li
              key={index}
              className={pageNumber === currentPage ? 'active' : ''}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </ul>
    );
  };

  const createStarRating = () => {
    const cappedRating = Math.min(Math.max(ratingValue || 0, 0), 10);
    const fullStars = Math.floor(cappedRating / 2);
    const halfStars = cappedRating % 2;
    const emptyStars = 5 - fullStars - halfStars;
  
    const starHTML = [];
  
    for (let i = 0; i < fullStars; i++) {
      starHTML.push(<img key={`star_${i}`} src="/starf.png" alt="Full star" />);
    }
    for (let i = 0; i < halfStars; i++) {
      starHTML.push(<img key={`star_${i + fullStars}`} src="/star_half.png" alt="Half star" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      starHTML.push(<img key={`star_${i + fullStars + halfStars}`} src="/star_empty.png" alt="Empty star" />);
    }
  
    return starHTML;
  };
  
  

  useEffect(() => {
    if (gameData) {
      console.log("Game Title:", gameData.name);
      console.log("Game Image:", gameData.cover);
      console.log("Release Date:", gameData.first_release_date);
      console.log("Genre:", gameData.genres);
      console.log("Platforms:", gameData.platforms);
      console.log("Game Summary:", gameData.summary);
      console.log("Reviews:", gameData.reviews);
    }
   }, [gameData]);

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    const review = document.getElementById('review').value;
    
    console.log('Submitted Email:', email.value);
    console.log('Submitted Name:', name.value);
    console.log('Submitted Score:', score.value);
    console.log('Submitted Review:', review.value);
    try {
     // console.log(gameData.name)
      const response = await fetch(`http://localhost:3000/review/${gameData.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          name: name.value,
          rating: parseInt(score.value),
          description: review.value,
        }),
      });
      if (response.ok) {
        alert('Avaliação publicada!');
      } else {
        alert('Falha ao submeter avaliação');
      }
    } catch (error) {
      console.log('Erro ao submeter avaliação:', error);
    }
  }
  if (!gameData) {
    return <div>Loading...</div>;
  }

  const {
    reviews
  } = gameData;

  return (
    <>
      <main>
        <section id="game-information">
          <div id="game-upper-section">
            <div id="game-image-section">
              <img id="game-image" src={gameData.cover} alt="Imagem do jogo" />
              <div id="game-summary" className="game-summary">
                {gameData.summary}
              </div>
            </div>
            <div id="game-details-section">
              <h2 id="game-title">{gameData.name}</h2>
              <p id="game-release-date">Lançamento: <span className='game-info'>{gameData.first_release_date}</span></p>
              <p id="game-developer"></p>
              <p id="game-genre">Categorias: <span className='game-info'>{gameData.genres}</span></p>
              <p id="game-platforms">Plataformas: <span className='game-info'>{gameData.platforms}</span></p>
            </div>
          </div>
          <div id="rating-form-section">
            <div className="rating-form-container">
              <div className="rating-form-block">
                <h2>NOS CONTE SUA EXPERIÊNCIA COM O JOGO!</h2>
                <form id="rating-form" onSubmit={handleSubmitReview}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="score">Sua nota para o jogo:</label>
                <input
                   type="number"
                    id="score"
                    name="score"
                    min="1"
                    max="10"
                    onChange={(e) => setRatingValue(parseInt(e.target.value))}
                    required
                   />
                <div id="stars-display">{createStarRating()}</div>               
                </form>
              </div>
              <div className="rating-form-block">
                  <h2 id="rating-desc">DESCRIÇÃO</h2>
                  <textarea id="review" name="review" rows="10" cols="50" required></textarea>
                  <button type="submit" id="submit-review" className="submit-button" form="rating-form">
                    Avaliar
                  </button>
              </div>
            </div>
        </div>
          <div id="game-reviews-section">
            <h2>Avaliações de outros usuários</h2>
            <div id="reviews">
            {reviews && reviews.map((review) => (
              <div key={review.id}>
                <p>{review.name}</p>
                <p>{review.score}</p>
                <p>{review.description}</p>
              </div>
            ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default GamePage;
