import React from 'react';
import classes from './Conversion.module.scss';

import garbage from '../../../assets/images/garbageIn.png';
import coin from '../../../assets/images/coins.png';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


const Conversion = ({harvesting, token , user, convertHarvesting}) => (
  <div className={classes.Conversion} >
    <h2>Conversion</h2>
    <div className={classes.Block}>
      <div className={classes.Item}>
        <img src={garbage} alt="Garbage" />
        <h3>Garbage</h3>
        <div className={classes.SubItem}>{harvesting}</div>
      </div>

      <div className={classes.Convertor}>
        <p>You may converting:</p>
        <div className={classes.SubItem}>{Math.floor(harvesting / 100)} S.P.</div>
        <p>from garbage!</p>
        <Button btnType="Success" disabled={harvesting < 100} clicked={() => convertHarvesting(Math.floor(harvesting / 100), token, user)} >Convert</Button>
      </div>

      <div className={classes.Item}>
        <img src={coin} alt="Space Coins" />
        <h3>Space Coins</h3>
        <div className={classes.SubItem}>{Math.floor(harvesting / 100) < 0 ? 0 : Math.floor(harvesting / 100)}</div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    harvesting: state.user.collect,
    token: state.auth.token,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    convertHarvesting: (coins, token, user) => dispatch(actions.convertHarvesting(coins, token, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversion);