import React from 'react'
import classes from './Spinner.module.scss'
import logo from '../../../assets/images/mcsLogo.png';

const Spinner = () => (
  <div className={classes.Loader}>
    <img src={logo} alt="MCSLogo" />
  </div>
);

export default Spinner;