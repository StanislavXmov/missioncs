import React from 'react';
import Tab from './Tab/Tab';
import { Switch, Route } from 'react-router-dom';

import classes from './HomeNav.module.scss';
import Statistics from '../../HomeScreenComponents/Statistics/Statistics';
import Harvesters from '../../HomeScreenComponents/Harvesters/Harvesters';
import Conversion from '../../HomeScreenComponents/Conversion/Conversion';


const HomeNav = ({name, level, harvesting, coins, harvesters, collectedAll}) => {
  
  return (
    <div className={classes.HomeNav}>
      <div className={classes.Tabs}>
        <Tab exact={true} name={'Statistics'} link={'/'} />
        <Tab name={'Harversters'} link={'/harversters'} />
        <Tab name={'Conversion'} link={'/conversion'} />
      </div>
      <div className={classes.Viewport}>
        <Switch>
          <Route path="/harversters">
            <Harvesters/>
          </Route>
          <Route path="/conversion">
            <Conversion/>
          </Route>
          <Route path="/">
            <Statistics name={name} level={level} harvesting={harvesting} coins={coins} harvesters={harvesters} collectedAll={collectedAll} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
export default HomeNav;