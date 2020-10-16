import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"

// import * as actions from '../../store/actions/index';
import classes from './Missions.module.scss'
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import { useHistory } from "react-router-dom";


const Missions = () => {

  let history = useHistory();

  const [mission1IsOpen, setMission1IsOpen] = useState(false);
  const [mission2IsOpen, setMission2IsOpen] = useState(false);

  
  return (
    <div className={classes.Missions}>
      <h1>Missions</h1>
      <div className={classes.Block}>

        <div className={classes.Mission}>
          <div className={classes.Select}>
            <Button btnType={'Danger'} clicked={() => setMission1IsOpen(mission1IsOpen => !mission1IsOpen)} >А давай собирать вручную)</Button>
          </div>
          <AnimatePresence>
          {mission1IsOpen && <motion.div initial={{ opacity: 0}} animate={{display: 'flex', opacity: 1 }} exit={{ opacity: 0}}  className={classes.Info}>
            <div className={classes.Descr}>
            Ой ой, все сломалось… Автоматизация накрылась… Но ты же поможешь нам?
            Вот тебе наша супер Харвест-Корзина и с помощью курсора давай соберем этот мусор.
            </div>
            <Button btnType={'Success'} clicked={() => history.push("/missions/diy") } >Start Mission</Button>
          </motion.div>}
          </AnimatePresence>
        </div>
        <div className={classes.Mission}>
          <div className={classes.Select}>
            <Button btnType={'Danger'} clicked={() => setMission2IsOpen(mission2IsOpen => !mission2IsOpen)} >Сбор на харвестере</Button>
          </div>
          <AnimatePresence>
          {mission2IsOpen && <motion.div initial={{ opacity: 0}} animate={{display: 'flex', opacity: 1 }} exit={{ opacity: 0}}  className={classes.Info}>
            <div className={classes.Descr}>
            Как круто, что ты ты умеешь летать на харвестере, ты же точно умеешь? Окей, тогда вперед в космос!
            </div>
            <Button btnType={'Success'} clicked={() => history.push("/missions/inspace")} >Start Mission</Button>
          </motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Missions);