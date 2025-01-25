import React from 'react';

function Box({ content, width, height, direction }) {
  return (
    <div className={`flex ${direction} bg-light-full gap-1 rounded-xl ${width} ${height} rounded-xl`}>
      {content}
    </div>
  );
}

export default Box;
