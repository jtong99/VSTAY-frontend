import React from 'react';

function Content({ translate, transition, width, children }) {
  return (
    <div
      style={{
        transform: `translateX(-${translate}px)`,
        transition: `transform ease-out ${transition}s`,
        height: '200px',
        width: `500px`,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export default Content;
