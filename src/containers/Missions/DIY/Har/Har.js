import React from 'react';
import { useDrop } from 'react-dnd';

import classes from './Har.module.scss';




const Har = ({type, handleDrop}) => {
  const [{canDrop, isOver}, dropRef] = useDrop({
    accept: type,
    drop: () => {
      handleDrop();
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  let background = 'transparent';
  if (canDrop) background = "#dfff5f";
  if (isOver) background = "#fff";
  // style={{backgroundColor: background}}

  return (
    <div className={classes.Har} ref={dropRef}  >
      <svg xmlns="http://www.w3.org/2000/svg" width="328" height="334" viewBox="0 0 328 334" fill="none">
        <path d="M24.6525 198.708L24.6301 198.508M24.6525 198.708L18.3996 197.774L17.026 167.185L9.6374 177.83L6.15632 177.523L2 158.092L4.66802 132.243L8.18078 132.528L10.7077 133.063L11.2082 128.2L11.2283 128.12L12.2 124.23L15.4395 117.403L15.1265 90.3665L22.7367 74.6602L26.1709 74.9056L33.2553 77.6928L61.0712 55.0368L49.243 44.4053L103.844 2L273.392 12.0124L250.334 41.4367L263.887 42.3018L298.047 56.6779L308.713 105.337L308.629 108.218L311.944 95.3274L315.704 95.5961L319.253 98.5036L320.742 120.874L323.483 121.081L324.236 139.788L325.552 144.465L326 155.782L324.7 170.599L322.389 180.47L319.255 187.278L315.869 207.582L311.784 225.027L308.124 224.693L304.433 223.874L303.123 203.709L299.533 203.392L299.4 200.98L291.532 216.771L264.298 267.459L235.091 291.607L213.797 332L86.5292 318.084L64.7482 281.172L29.6937 244.342L24.6525 198.708Z" stroke={background} strokeWidth="6" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export default Har;