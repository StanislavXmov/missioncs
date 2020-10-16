import React from 'react';
import classes from './Tab.module.scss';
import { NavLink } from 'react-router-dom';

const Tab = ({exact, link, name}) => {
  

  return (
    <div className={classes.Tab}>
      <NavLink className={classes.TabItem} activeClassName={classes.active}  exact={exact} to={link}>{name}</NavLink>
    </div>
  );
}

export default Tab;