import React, { useState, useEffect } from 'react';
import anime from 'animejs';

const FlippingText = () => {
  const [index, setIndex] = useState(0);
  const words = ['Frontend', 'FullStack', 'Creative'];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     anime({
  //       targets: '.flipping-text',
  //       rotateX: [0, 180],
  //       duration: 500,
  //       easing: 'easeInOutQuad',
  //       complete: () => {
  //         setIndex((prevIndex) => (prevIndex + 1) % words.length);
  //         anime({
  //           targets: '.flipping-text',
  //           rotateX: [180, 360],
  //           duration: 500,
  //           easing: 'easeInOutQuad',
  //         });
  //       },
  //     });
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div 
          className="flipping-text-container"
          style={{ 
            display: 'inline-block', 
            // width: '340px', // Fixed width to accommodate the longest word
            textAlign: 'center', // Center the text within the container
            whiteSpace: 'nowrap',
          }}
        >
          <span
            className="flipping-text"
            style={{
              display: 'inline-block',
              transformOrigin: 'center',
              backfaceVisibility: 'hidden',
            }}
          >
            {words[index]}
          </span>
        </div>
        &nbsp;Developer
      </h3>
    </div>
  );
};

export default FlippingText;
