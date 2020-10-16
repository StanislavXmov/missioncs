import React from 'react'
import classes from './Input.module.scss'

const Input = ({elementType, elementConfig, value, label, changed, invalid, shouldValidate, touched, errorMessage, min, max}) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }
  let validationError = null;
  if (invalid && touched) {
    validationError = <p className={classes.ValidationError}>{errorMessage}</p>;
  }

  switch (elementType) {
    case 'input':
      inputElement = <input 
          className={inputClasses.join(' ')} 
          {...elementConfig} 
          value={value}
          onChange={changed} 
          min={min}
          max={max}
          />
      break;
    case 'textarea':
      inputElement = <textarea 
          className={inputClasses.join(' ')} 
          {...elementConfig} 
          value={value}
          onChange={changed} />
      break;
  
    case 'select':
      inputElement = <select 
          className={inputClasses.join(' ')} 
          {...elementConfig} 
          value={value}
          onChange={changed}
        >{elementConfig.options.map(option => <option key={option.value} value={option.value} >{option.displayValue}</option> )}</select>
      break;
  
    default:
      inputElement = <input className={inputClasses.join(' ')} {...elementConfig} value={value} />
      break;
  }

  return (
    <div className={classes.Input} >
      <label className={classes.Label}>{label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}
export default Input;