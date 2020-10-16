import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import classes from './Garbage.module.scss';

const Garbage = ({type, cls, stl}) => {
  const [collected, setCollected] = useState(false);
  const [{opacity}, dragRef] = useDrag({
    item: {type},
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,

    }),
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop();
      setCollected(didDrop);
    },
  });

  

  let garbage = <div className={classes[cls]} ref={dragRef} style={{opacity, top: stl.top, left: stl.left}} ></div>
  if (collected) {
    garbage = null
  }

  return garbage;
}

export default Garbage;