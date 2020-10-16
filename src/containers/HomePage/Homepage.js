import React from 'react';

import * as actions from '../../store/actions/index';
import classes from './HomePage.module.scss'
import { connect } from 'react-redux';
import DialogueWindow from '../../components/DialoguWindow/DialogueWindow';
import HomeNav from '../../components/Navigation/HomeNav/HomeNav';
import StatisticScreen from '../../components/HomeScreenComponents/StatisticScreen/StatisticScreen';

const HomePage = ({name, level, harvesting, coins, harvesters, collectedAll}) => {

  return (
    <div className={classes.HomePage}>
      <StatisticScreen name={name} level={level} harvesting={harvesting} coins={coins} />
      <DialogueWindow screen={'home'} />
      <HomeNav name={name} level={level} harvesting={harvesting} coins={coins} harvesters={harvesters} collectedAll={collectedAll} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    name: state.user.name,
    level: state.user.level,
    harvesting: state.user.collect,
    coins: state.user.coins,
    harvesters: state.user.harvesters,
    collectedAll: state.user.collectedAll,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onReaded: (id) => dispatch(actions.messageReaded(id)),
    workStart: (start, end) => dispatch(actions.start(start, end)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);