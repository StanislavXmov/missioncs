import React from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { useLocation } from 'react-router-dom';

const Layout = ({isAuth, children}) => {

  let location = useLocation();
  
  return (
    <Auxiliary>
      <Toolbar isAuth={isAuth} location={location} />
      <main>
        {children}
      </main>
    </Auxiliary>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);