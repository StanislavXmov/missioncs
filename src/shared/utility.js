export const updateObject = (oldObj, updatedProps) => {
  return {
    ...oldObj,
    ...updatedProps
  }
}

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }
  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
  }
  return isValid;
}

export const random = (a, b) => {
  return Math.floor((Math.random() * (b - a)) + a);
}

export const checkAmount = (harvesters) => {
  return Object.keys(harvesters).reduce((s, k) => {
    return s + harvesters[k].amount;
  }, 0);
}
export const checkHarvesting = (harvesters) => {
  return Object.keys(harvesters).reduce((s, k) => {
    return s + (harvesters[k].perfomance * harvesters[k].amount);
  }, 0);
}