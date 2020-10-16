import React, { useState} from 'react';

import * as actions from '../../../store/actions/index';
import classes from './Diy.module.scss'
import { connect } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Har from './Har/Har';
import Garbage from './Garbage/Garbage';
import Statistic from './Statistic/Statistic';
import {random} from '../../../shared/utility';




const garbage = ['B','Ba', 'Bo', 'C', 'D', 'P'];

const Diy = ({addHarvesting, token, user}) => {

  const [counter, setCounter] = useState(0);
  const [garbageInSpace] = useState(new Array(random(3, 7)).fill('').map(() => garbage[random(0, garbage.length)]));
  
  const handleDrop = () => {
    setCounter(counter => counter + random(200, 10000));
  }
  
  
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.Diy}>
        <Statistic harvesting={counter} add={addHarvesting} token={token} user={user}/>
        <Har type={'garbage'} handleDrop={handleDrop}/>
        {garbageInSpace.map((g, i) => <Garbage key={g + i} type={'garbage'} cls={g} stl={{top: `${random(10, 80)}%`, left: `${random(20, 80)}%`}} />)}
      </div>
    </DndProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Diy);