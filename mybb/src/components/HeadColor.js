import React from 'react';

function Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="colorMask1">
          <feFlood floodColor="red" result="flood"></feFlood>
          <feComposite
            in="SourceGraphic"
            in2="flood"
            k1="5"
            operator="arithmetic"></feComposite>
        </filter>
      </defs>
      <image
        width="100%"
        height="100%"
        filter="url(#colorMask1)"
        href="/blobparts/blobbody1.png"></image>
    </svg>
  );
}

export default Icon;
