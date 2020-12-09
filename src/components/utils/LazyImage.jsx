import React, { useState, useRef } from 'react';
import { Fade } from 'react-bootstrap';
import useOnScreen from 'hooks/useOnScreen';
import avatarPlaceholder from '@assets/placeholder/avatar.svg';
import imagePlaceholder from '@assets/placeholder/placeholder-image.svg';

function LazyImage({ variant = 'image', src, height, width, style, ...props }) {
  const ref = useRef();
  const isOnScreen = useOnScreen(ref);
  const [isBroken, setIsBroken] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      {...props}
      ref={ref}
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        backgroundColor: !isLoaded && 'lightgrey',
        backgroundImage:
          variant === 'avatar' &&
          !isLoaded &&
          `url(${variant === 'avatar' ? avatarPlaceholder : imagePlaceholder})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <Fade in={!isBroken && (isOnScreen || isLoaded)} mountOnEnter>
        <div>
          {src && (
            <img
              onError={() => setIsBroken(true)}
              onLoad={() => setIsLoaded(true)}
              src={src}
              alt=""
              width="100%"
            />
          )}
        </div>
      </Fade>
    </div>
  );
}

export default LazyImage;
