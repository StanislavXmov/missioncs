import React from 'react';
import classes from './StoreCard.module.scss';


import Button from '../../../UI/Button/Button';



const StoreCard = ({harvester, select, selected}) => {
  
  return (
  <div className={!selected ? classes.Harvester : [classes.Harvester, classes.Selected].join(' ')} >
    <div className={classes.HarvesterImg}><img src={harvester.img} alt={harvester.name} /></div>
    <div className={classes.Block}>
      <div className={classes.SubTitle}>Harvester</div>
      <div className={classes.Title}>{harvester.name}</div>
      <Button btnType={'Success'} clicked={() => { select(harvester); }} >Open</Button>
    </div>
  </div>
);
}
export default StoreCard;