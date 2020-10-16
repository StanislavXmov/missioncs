import React from 'react';
import classes from './Statistics.module.scss';
import { checkAmount } from '../../../shared/utility';


const Statistics = ({ level, harvesting, coins, harvesters, collectedAll}) => (
  <div className={classes.Statistics} >
    <h2>All Statistics</h2>
    <div className={classes.Block}>
      <ul className={classes.List}>
        <li>Level : {level}</li>
        <li>SpaceCoin : {coins}</li>
        <li>Harvesters : {harvesters ? checkAmount(harvesters) : 0}</li>
        <li>Harvesting of all time: {collectedAll}</li>
      </ul>
    </div>
  </div>
);

export default Statistics;