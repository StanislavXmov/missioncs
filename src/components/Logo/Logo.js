import React from 'react';
import classes from './Logo.module.scss';
import logo from '../../assets/images/mcsLogo.png';

const Logo = () => (
  <div className={classes.Logo} >
    <img src={logo} alt="MCSLogo" />
  </div>
);

export default Logo;