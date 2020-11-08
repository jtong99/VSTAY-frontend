import React, { useState, useRef, useEffect } from 'react';
import style from './Slide.module.scss';
import SliderContent from './Content';
import Slide from './SlideElement';
import Arrow from './DirectionBtn';

function SliderImage() {
  const containerRef = useRef();
  const [containerWidth, setContainerWidth] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
    'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
    'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
  ];
  const [move, setMove] = useState({
    activeIndex: 0,
    transition: 0,
    translate: 0.45,
  });

  useEffect(() => {
    if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
  }, []);
  const getWidth = () => window.innerWidth;
  const nextSlide = () => {
    if (move.activeIndex === images.length - 1) {
      return setMove({
        ...move,
        translate: 0,
        activeIndex: 0,
      });
    }

    setMove({
      ...move,
      activeIndex: move.activeIndex + 1,
      translate: (move.activeIndex + 1) * containerWidth,
    });
  };

  const prevSlide = () => {
    if (move.activeIndex === 0) {
      return setMove({
        ...move,
        translate: (images.length - 1) * containerWidth,
        activeIndex: images.length - 1,
      });
    }

    setMove({
      ...move,
      activeIndex: move.activeIndex - 1,
      translate: (move.activeIndex - 1) * containerWidth,
    });
  };
  return (
    <div className={style.slider} ref={containerRef}>
      <button onClick={() => console.log(move)}>click</button>

      <SliderContent
        translate={move.translate}
        transition={move.transition}
        width={containerWidth * images.length}
      >
        {images.map((i) => (
          <Slide content={i} />
        ))}
      </SliderContent>
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
    </div>
  );
}

export default SliderImage;
