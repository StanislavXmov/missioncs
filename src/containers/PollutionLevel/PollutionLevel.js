import React, { useState} from 'react';

import classes from './PollutionLevel.module.scss'
import { connect } from 'react-redux';




const PollutionLevel = ({collectedAll}) => {

  const [level] = useState((new Date().getTime() - collectedAll));
  
  return (
    <div className={classes.PollutionLevel}>
      <div  className={classes.PollutionBlock}>
        <div  className={classes.PollutionDescr}>
          <h1>Pollution Level: <strong>{level}</strong> pcs.</h1>
          <h2>You collected <strong>{collectedAll}</strong> pcs. garbage from space.</h2>
        </div>
      </div>
    
    </div>
  );
}

const mapStateToProps = state => {
  return {
    collectedAll: state.user.collectedAll
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollutionLevel);