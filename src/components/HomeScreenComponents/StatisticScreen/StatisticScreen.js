import React from 'react';

// import * as actions from '../../store/actions/index';
import classes from './StatisticScreen.module.scss'
import { connect } from 'react-redux';
// import Spinner from '../../components/UI/Spinner/Spinner';



const StatisticScreen = ({name, level, harvesting, coins}) => {


  // useEffect(() => {
    
  // }, []);

  
  return (
    <div className={classes.StatisticScreen}>
      <div className={classes.Statistic}>{name}</div>
      <div className={classes.Statistic}>Level: {level}</div>
      <div className={classes.Statistic}>Harvesting: {harvesting}</div>
      <div className={classes.Statistic}>
        {coins}
        <svg width="18" height="24" viewBox="0 0 188 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M66.5917 120C36.9938 120 13 96.0472 13 66.5C13 36.9528 36.9938 13 66.5917 13H175M66.5917 120C66.5917 149.547 90.5855 173.5 120.183 173.5H146.214M66.5917 120C66.5917 90.4528 90.5855 66.5 120.183 66.5H146.214M121.408 120C151.006 120 175 143.953 175 173.5C175 203.047 151.006 227 121.408 227H13" stroke="#fff" strokeWidth="25"/>
        </svg>
        
        </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticScreen);