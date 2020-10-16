import { useState, useEffect } from "react";


export default function useMove() {
  const [x, setX] = useState(40);
  const [y, setY] = useState(160);
  const [direction, setDirection] = useState('down');

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    function handleKeyDown(e) {
      if (e.key === 'ArrowUp') move('up');
      if (e.key === 'ArrowLeft') move('left');
      if (e.key === 'ArrowDown') move('down');
      if (e.key === 'ArrowRight') move('right');
    };
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const move = dir => {
    setDirection(dir);
    if (dir === 'up') setY(y => y - 40);
    if (dir === 'left') setX(x => x - 40);
    if (dir === 'down') setY(y => y + 40);
    if (dir === 'right') setX(x => x + 40);
  }

  return {x, y, direction, move};
}