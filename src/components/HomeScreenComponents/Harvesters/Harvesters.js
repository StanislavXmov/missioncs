import React, { useEffect } from 'react';
import classes from './Harvesters.module.scss';
import Harvester from './Harvester/Harvester';
import { checkAmount, checkHarvesting } from '../../../shared/utility';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


const Harvesters = ({harvesters, start, end, isWorking, isDone, workStart, workEnd, workDone, addHarvesting}) => {

  useEffect(() => {
    if (end && end < new Date().getTime()) {
      workEnd();
    }
  }, [end, workEnd]);

  const workHandler = () => {
    workStart(new Date().getTime(), new Date().getTime() + 20000);
  }
  const doneHandler = () => {
    workDone();
    addHarvesting(checkHarvesting(harvesters));
    //addharvesting
    //done -> false
  }

  return (
    <div className={classes.Harvesters} >
      <h2>Harvesters</h2>
      {harvesters && start && isWorking &&
        <div className={classes.HarvestersStatistics}>
          <div>Harvesters return on base in {end - new Date().getTime()} minutes.</div>
          <Button btnType="Success" disabled={true} >Working</Button>
        </div>
      }
      {harvesters && isDone &&
        <div className={classes.HarvestersStatistics}>
          <div>Harvesters return on base. They taked {checkHarvesting(harvesters)} garbage.</div>
          <Button btnType="Success" clicked={doneHandler} >Take Harvest</Button>
        </div>
      }
      {harvesters && !isWorking && !isDone &&
        <div className={classes.HarvestersStatistics}>
          <div>Harvesters: {checkAmount(harvesters)} on base.</div>
          <Button btnType="Success" clicked={workHandler} >Send On Work</Button>
        </div>
      }

      { harvesters ? Object.keys(harvesters).map((k, i) => <Harvester key={k} harvester={harvesters[k]} />) : <p>You don't have a harvesters!</p>}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    harvesters: state.user.harvesters,
    start: state.user.harvestersOnWork.start,
    end: state.user.harvestersOnWork.end,
    isWorking: state.user.harvestersOnWork.isWorking,
    isDone: state.user.harvestersOnWork.isDone,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    workStart: (start, end) => dispatch(actions.start(start, end)),
    workEnd: () => dispatch(actions.end()),
    workDone: () => dispatch(actions.workDone()),
    addHarvesting: (collected) => dispatch(actions.addHarvesting(collected)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Harvesters);