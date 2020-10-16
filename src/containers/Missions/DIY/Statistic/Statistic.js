import React from 'react';
import classes from './Statistic.module.scss';
import Button from '../../../../components/UI/Button/Button';
import { useHistory } from 'react-router-dom';


const Statistic = ({harvesting, add, token, user}) => {
  let history = useHistory();
  const takeHandler = () => {
    add(harvesting, token, user);
    history.push("/");
  }
  return (
    <div className={classes.Statistic} >
      <h2>Harvesting: {harvesting}</h2>
      <Button btnType="Success" disabled={harvesting === 0} clicked={takeHandler} >Take</Button>
    </div>
  );
}


export default Statistic;
