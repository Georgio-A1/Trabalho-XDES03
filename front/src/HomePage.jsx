
import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();
    useEffect(() => {
    const glide = new Glide('.glide', {
      type: 'carousel',
      perView: 3,
      focusAt: 'center',
    });
    glide.mount();
    return () => {
      glide.destroy();
    };
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/genre/${category}`);
  };

  return (
    <>
    <main>
        <section id="featured-games" className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              <li className="glide__slide slide1"></li>
              <li className="glide__slide slide2"></li>
              <li className="glide__slide slide3"></li>
            </ul>
          </div>
        </section>

        <h2 className="section-title">Principais Categorias</h2>
        <section id="game-categories">
          <div className="category category1" onClick={() => handleCategoryClick('5')}>FPS</div>
          <div className="category category2" onClick={() => handleCategoryClick('4')}>LUTA</div>
          <div className="category category3" onClick={() => handleCategoryClick('10')}>CORRIDA</div>
          <div className="category category4" onClick={() => handleCategoryClick('14')}>ESPORTES</div>
          <div className="category category5" onClick={() => handleCategoryClick('8')}>PLATAFORMA</div>
          <div className="category category6" onClick={() => handleCategoryClick('12')}>RPG</div>
          <div className="category category7" onClick={() => handleCategoryClick('11')}>RTS</div>
          <div className="category category8" onClick={() => handleCategoryClick('13')}>SIMULADOR</div>
          <div className="category category9" onClick={() => handleCategoryClick('7')}>MUSICA</div>
          <div className="category category10" onClick={() => handleCategoryClick('9')}>PUZZLE</div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
