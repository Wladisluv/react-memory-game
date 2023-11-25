import React, { useState, useEffect } from 'react';
import './Cards.scss';
import Card from '../Card/Card';

interface ICard {
  id: number;
  src: string;
  isFlipped: boolean;
};

const cardImages = [
  { src: 'https://pngimg.com/d/cat_PNG50534.png' },
  { src: 'https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-sitting-orange-cat-on-white-background-png-image_7094889.png' },
  { src: 'https://png.pngtree.com/png-vector/20231020/ourmid/pngtree-cute-kitty-cat-png-image_10236144.png' },
  { src: 'https://static.vecteezy.com/system/resources/thumbnails/021/830/103/small/realistic-cute-cat-cartoon-style-digital-artwork-free-png.png' },
  { src: 'https://pngimg.com/d/cat_PNG50465.png' },
  { src: 'https://www.freeiconspng.com/thumbs/cat-png/baby-cat-png-12.png' },
];

const Cards = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [turns, setTurns] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.src === secondCard.src) {
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              flippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const shuffleCards = () => {
    const shuffledCards: ICard[] = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index, isFlipped: false }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setTurns(0);
  }

  const rotateCard = (id: number, src: string) => {

    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, id])
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, isFlipped: true } : card
          )
          )
    }

    if (flippedCards.length < 1) {
      setTurns(prev => prev + 1)
    }
    
  }

  const resetGame = (cards: ICard[]) => {
    return cards.every((card) => card.isFlipped) ? shuffleCards() : null;
  };

  setTimeout(() => {
    resetGame(cards)
  }, 1000);

  return (
    <div>
      <div className='btn-container'>
        <button className='btn' onClick={shuffleCards}>
          New Game
        </button>
      </div>

      <div className="turns-container">
        <h3>{turns}</h3>
      </div>

      <div className='cards-grid'>
        {cards.map((card) => (
          <Card
            key={card.id}
            img={card.src}
            isFlipped={card.isFlipped}
            onClick={() => rotateCard(card.id, card.src)}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
