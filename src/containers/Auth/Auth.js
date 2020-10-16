import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.scss'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../shared/utility';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import LogoImage from '../../components/LogoImage/LogoImage';
import DialogueWindow from '../../components/DialoguWindow/DialogueWindow';


const Auth = ({loading, error, isAuth, messages, onAuth, sendMessages, loadMessages}) => {

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [controls, setControls] = useState({
    name: {
      label: 'Name',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errorMessage: 'Enter Name'
    },
    email: {
      label: 'Email',
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
      errorMessage: 'Enter correct email'
    },
    password: {
      label: 'Password',
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false,
      errorMessage: `Password length must be more 6 symbols`
    },
  });
  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    let disabled = false;
    Object.keys(controls).forEach(k => {
      if (!controls[k].valid) disabled = true;
    });
    setBtnDisabled(disabled);

  }, [controls, setBtnDisabled])

  const submitHandler = e => {
    e.preventDefault();
    onAuth(controls.name.value, controls.email.value, controls.password.value, isSignup);
  }

  const switchAuthModeHandler = () => {
    setIsSignup(isSignup => !isSignup);
  }

  const inputChangedHandler = (e, contolName) => {
    const updatedControls = updateObject(controls, {
      [contolName]: updateObject(controls[contolName], {
        value: e.target.value,
        valid: checkValidity(e.target.value, controls[contolName].validation),
        touched: true
      })
    });
    setControls(updatedControls);
  }

  const formElements = [];
  for (const key in controls) {
    formElements.push({
      id: key,
      config: controls[key]
    })
  }

  let form = formElements.map(formElement => <Input 
      key={formElement.id}
      elementType={formElement.config.elementType} 
      elementConfig={formElement.config.elementConfig} 
      value={formElement.config.value}
      changed={(e) => inputChangedHandler(e, formElement.id)}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      errorMessage={formElement.config.errorMessage}
      label={formElement.config.label}
    />)

  if (loading) {
    form = <Spinner />
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error.message}</p>
  }

  return (
    <Auxiliary>
      <LogoImage />
      <DialogueWindow screen={'auth'} />
      <div className={classes.Auth} >
        <div className={classes.AuthTitle}>
          {isSignup 
          ? <div className={classes.Log}><svg className={classes.SignUp} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3c3c3c" width="32px" height="32px"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/></svg><h2>Sign Up</h2></div>
          : <div className={classes.Log}><svg  className={classes.Login} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3c3c3c" width="32px" height="32px"><g><rect fill="none" height="24" width="24"/></g><g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/></g></svg><h2>Login</h2></div>
          }
        </div>
        
        {errorMessage}
        <Button btnType="Danger" clicked={switchAuthModeHandler} >SWITCH TO {isSignup ? 'LOGIN': 'SIGN UP'}</Button>
        <form onSubmit={submitHandler} >
          {form}
          <Button btnType="Success" disabled={btnDisabled} >SUBMIT</Button>
        </form>
        
      </div>
    </Auxiliary>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    messages: state.messages.messages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (name, email, password, isSignup) => dispatch(actions.auth(name, email, password, isSignup)),
    sendMessages: () => dispatch(actions.sendMessageOnDB()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);