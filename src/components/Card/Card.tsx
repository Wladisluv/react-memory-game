import React, { FC } from 'react';
import './Card.scss';

interface ICard {
  img: string;
  isFlipped: boolean;
  onClick: () => void;
};

const Card: FC<ICard> = ({ img, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className='card__back'></div>
      <div className='card__front' style={{ backgroundImage: `url(${img})` }}></div>
    </div>
  );
};

export default Card;
