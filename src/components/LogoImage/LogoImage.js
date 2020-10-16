import React from 'react';
import classes from './LogoImage.module.scss';
import missionLogo from '../../assets/images/mission.png'

const LogoImage = () => (
  <div className={classes.LogoImage} >
    <img src={missionLogo} alt="MCSLogo" />
  </div>
);

export default LogoImage;