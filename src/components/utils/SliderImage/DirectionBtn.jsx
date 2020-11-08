import React from 'react';
import { Button } from 'react-bootstrap';
import { ArrowRight, ArrowLeft } from 'react-feather';
import style from './Slide.module.scss';

function DirectionBtn({ handleClick, direction }) {
  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        position: 'absolute',
        top: '50%',
        right: direction === 'right' ? '25px' : 'inherit',
        left: direction === 'left' ? '25px' : 'inherit',
        height: '50px',
        width: '50px',
        justifyContent: 'center',
        background: 'white',
        borderRadius: '50%',
        cursor: 'pointer',
        alignItems: 'center',
        transition: 'transform ease-in 0.1s',
        // &:hover {
        //   transform: scale(1.1);
        // }
        // img {
        //   transform: translateX(${direction === 'left' ? '-2' : '2'}px);
        //   &:focus {
        //     outline: 0;
        //   }
        // }
      }}
    >
      {direction === 'right' ? (
        <ArrowRight
          style={{ transform: `translateX(${direction === 'left' ? '-2' : '2'}px)` }}
        />
      ) : (
        <ArrowLeft
          style={{ transform: `translateX(${direction === 'left' ? '-2' : '2'}px)` }}
        />
      )}
    </div>
  );
}

export default DirectionBtn;
