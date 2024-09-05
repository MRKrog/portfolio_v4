import React from 'react';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g>
      <circle cx="50" cy="50" r="45" 
        stroke="#3d3d3d" 
        strokeWidth="5" 
        strokeLinecap="round" 
        fill="none"
        strokeDasharray="282.6" 
        strokeDashoffset="282.6"
      >
        <animate 
          attributeName="stroke-dashoffset" 
          from="282.6" 
          to="0" 
          dur="1.5s" 
          fill="freeze" 
        />
      </circle>
      <g id="M" transform="translate(25, 25)">
        <path d="M10,40 L10,10 L20,10 L25,25 L30,10 L40,10 L40,40 Z" fill="#3d3d3d"/>
      </g>
    </g>
  </svg>
);

export default IconLoader;
