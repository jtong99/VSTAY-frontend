import React, { useState } from 'react';
import { Carousel, Image, Button } from 'react-bootstrap';
import { ArrowRight, ArrowLeft, Trash2 } from 'react-feather';

function CarouselImage({ images, onRemove }) {
  const [active, setActive] = useState(0);
  const removeImageFile = (i) => {
    if (onRemove) onRemove(i);
    console.log(active);
    setActive(active > 0 ? active - 1 : active + 1);
  };
  return (
    <>
      <Carousel
        className="mb-5"
        activeIndex={active}
        onSelect={(index) => setActive(index)}
        // indicators
        nextIcon={
          <div
            className="text-primary"
            style={{
              background: '#FFFFFF',
              padding: '6px 8px',
              borderRadius: '20px 0px 0px 20px',
              fontSize: 18,
              position: 'relative',
              right: '-25%',
              backgroundColor: '#343434',
            }}
          >
            <ArrowRight style={{ color: '#ffffff', marginBottom: 2 }} />
          </div>
        }
        prevIcon={
          <div
            className="text-primary"
            style={{
              background: '#FFFFFF',
              padding: '6px 8px',
              borderRadius: '0px 20px 20px 0px',
              fontSize: 18,
              position: 'relative',
              left: '-25%',
              backgroundColor: '#343434',
            }}
          >
            <ArrowLeft style={{ color: '#ffffff', marginBottom: 2 }} />
          </div>
        }
        //   style={{
        //     minHeight: 'calc(100vw / 3)',
        //   }}
      >
        {images.map((img, i) => (
          <Carousel.Item
            key={i}
            // style={{
            //   backgroundImage: `url('${img}')`,
            //   backgroundSize: 'cover',
            //   backgroundRepeat: 'no-repeat',
            // }}
          >
            <div style={{ position: 'relative' }}>
              <Image src={img} style={{ width: '100%', height: '200px' }} />
              <Button
                variant="link"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 60,
                  backgroundColor: '#343434',
                  borderRadius: '50%',
                }}
                onClick={() => removeImageFile(i)}
              >
                <Trash2 style={{ color: '#ffffff' }} />
              </Button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default CarouselImage;
