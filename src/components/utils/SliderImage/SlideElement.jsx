import React from 'react';

function SlideElement({ content }) {
  return (
    <div
      style={{
        height: '100px',
        width: '100%',
        backgroundImage: `url(${content})`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center`,
      }}
    />
  );
}

export default SlideElement;
