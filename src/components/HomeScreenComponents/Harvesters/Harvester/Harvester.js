import React from 'react';
import classes from './Harvester.module.scss';


const Harvester = ({harvester}) => (
  <div className={classes.Harvester} >
    <div className={classes.HarvesterImg}><img src={harvester.img} alt="Harvester" /></div>
    <div className={classes.Block}>
      <div className={classes.Title}>{harvester.name}</div>
      <div className={classes.Perfomance}>{harvester.perfomance}</div>
      <div className={classes.Descr}>{harvester.info}</div>
      <div className={classes.Amount}>Amount: {harvester.amount}</div>
    </div>
  </div>
);

export default Harvester;