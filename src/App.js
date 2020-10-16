import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Homepage from './containers/HomePage/Homepage';
import Logout from './containers/Auth/Logout/Logout';
import PollutionLevel from './containers/PollutionLevel/PollutionLevel';
import Team from './containers/Team/Team';
import Store from './containers/Store/Store';
import Missions from './containers/Missions/Missions';
import Diy from './containers/Missions/DIY/Diy';
import Spinner from './components/UI/Spinner/Spinner';
import InSpace from './containers/Missions/InSpace/InSpace';


function App({isAuth, loading, userId, loadUser, onTryAutoSignup, loadMessages, getUser}) {

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (loadUser) {
      getUser(userId);
    }
  }, [getUser, userId, loadUser]);

  let routes;
  routes = <Switch>
    <Route path="/" exact component={Auth} />
    <Route path="/team" component={Team} />
    <Redirect to="/" />
  </Switch>;
  
  if (isAuth) {
    routes = <Switch>
      <Route path="/level" component={PollutionLevel} />
      <Route path="/logout" component={Logout} />
      <Route path="/team" component={Team} />
      <Route path="/store" component={Store} />
      <Route path="/missions/diy" component={Diy} />
      <Route path="/missions/inspace" component={InSpace} />
      <Route path="/missions" component={Missions} />
      
      <Route path="/:id?" exact component={Homepage} />
      <Redirect to="/" />
    </Switch>;
  }

  return (
    <div>
      <Layout>
        {loading ? <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner/></div>: routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
    loading: state.auth.loading,
    userId: state.auth.userId,
    loadUser: state.auth.loadUser

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    loadMessages: () => dispatch(actions.fetchMessage()),
    getUser: (id) => dispatch(actions.getUsers(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

