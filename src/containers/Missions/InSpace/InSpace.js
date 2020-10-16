import React, { useState, useRef, useEffect} from 'react';

import * as actions from '../../../store/actions/index';
import classes from './InSpace.module.scss'
import { connect } from 'react-redux';

import {random} from '../../../shared/utility';
import Statistic from '../DIY/Statistic/Statistic';
import useMove from './useMove';

import down from '../../../assets/images/harvesters/d.png';
import up from '../../../assets/images/harvesters/u.png';
import left from '../../../assets/images/harvesters/l.png';
import right from '../../../assets/images/harvesters/r.png';

import bamin from '../../../assets/images/garbage/bamin.png';
import bmin from '../../../assets/images/garbage/bmin.png';
import bomin from '../../../assets/images/garbage/bomin.png';
import cmin from '../../../assets/images/garbage/cmin.png';
import dmin from '../../../assets/images/garbage/dmin.png';
import gmin from '../../../assets/images/garbage/gmin.png';
import pmin from '../../../assets/images/garbage/pmin.png';

const InSpace = ({addHarvesting, token, user}) => {

  const [counter, setCounter] = useState(0);
  const canvasRef = useRef(null);
  const imgDownRef = useRef(null);
  const imgLeftRef = useRef(null);
  const imgUpRef = useRef(null);
  const imgRightRef = useRef(null);

  const imgBaRef = useRef(null);
  const imgBRef = useRef(null);
  const imgBoRef = useRef(null);
  const imgCRef = useRef(null);
  const imgDRef = useRef(null);
  const imgGRef = useRef(null);
  const imgPRef = useRef(null);

  const garbageImages = [imgBaRef, imgBRef, imgBoRef, imgCRef, imgDRef, imgGRef, imgPRef];
  const [garbageInSpace] = useState(new Array(random(3, 7)).fill('').map(() => garbageImages[random(0, garbageImages.length)]));
  const [coordGarbages] = useState(garbageInSpace.map(() => ({x: random(60, window.innerWidth - 60), y: random(220, window.innerHeight - 60), visible: true})));
  const {x, y, direction} = useMove();
  
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
  }, []);

  useEffect(() => {
    const draw = () => {
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let imgRef;
      if (direction === 'up') imgRef = imgUpRef;
      if (direction === 'left') imgRef = imgLeftRef;
      if (direction === 'down') imgRef = imgDownRef;
      if (direction === 'right') imgRef = imgRightRef;
      context.drawImage(imgRef.current, x, y);
      const drawG = (g, x, y) => {
        context.drawImage(g, x, y);
      }
    
      garbageInSpace.forEach((g,i) => {
        if (coordGarbages[i].visible) {
          drawG(g.current, coordGarbages[i].x, coordGarbages[i].y)
        }
      });
    }
    draw();
    


    coordGarbages.forEach((c, i) => {
      if (c.visible && x + 75 > c.x && x + 75 < c.x + 100  && y + 75 > c.y && y + 75 < c.y + 100) {
        handleDrop(i);
        coordGarbages[i].visible = false;
        draw();
      }
    });
    
  }, [x, y, direction, garbageInSpace, coordGarbages]);
  
  const handleDrop = () => {
    setCounter(counter => counter + random(200, 10000));
  }
  
  return (
    <div className={classes.InSpace}>
      <Statistic harvesting={counter} add={addHarvesting} token={token} user={user}/>
      <canvas ref={canvasRef}/>
      <div className={classes.Images}>
        <img ref={imgDownRef} src={down} alt="Down" />
        <img ref={imgRightRef} src={right} alt="Right" />
        <img ref={imgUpRef} src={up} alt="Up" />
        <img ref={imgLeftRef} src={left} alt="Left" />
        <img ref={imgBRef} src={bmin} alt="Garbage" />
        <img ref={imgBaRef} src={bamin} alt="Garbage" />
        <img ref={imgBoRef} src={bomin} alt="Garbage" />
        <img ref={imgCRef} src={cmin} alt="Garbage" />
        <img ref={imgDRef} src={dmin} alt="Garbage" />
        <img ref={imgGRef} src={gmin} alt="Garbage" />
        <img ref={imgPRef} src={pmin} alt="Garbage" />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addHarvesting: (collected, token, user) => dispatch(actions.addHarvesting(collected, token, user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InSpace);