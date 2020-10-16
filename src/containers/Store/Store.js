import React, { useState } from 'react';

import * as actions from '../../store/actions/index';
import classes from './Store.module.scss';
import { connect } from 'react-redux';
import StoreCard from '../../components/UI/Cards/StoreCard/StoreCard';

import salesman from '../../assets/images/astro/seller.png';

import harvester1 from '../../assets/images/harvesters/01A1.png'
import harvester2 from '../../assets/images/harvesters/04B2.png'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const harvesters = [
  {
    name: '01A',
    perfomance: 1000,
    info: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    price: 50,
    img: harvester1,
  },
  {
    name: '04B',
    perfomance: 5000,
    info: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    price: 300,
    img: harvester2,
  },
];

const Store = ({coins, token, user, addHarvester}) => {

  const [selectHarvester, setSelectHarvester] = useState(null);
  const [amount, setAmount] = useState(selectHarvester ? Math.floor(coins / selectHarvester.price) : 1);
  
  return (
    <div className={classes.Store}>
      <h1>Space Store</h1>
      <div className={classes.Block}>
        <div className={classes.Items}>

          {harvesters.map(h => <StoreCard key={h.name} harvester={h} select={setSelectHarvester} selected={selectHarvester ? h.name === selectHarvester.name : false} />)}
          
        </div>
        <div className={classes.Sidebar}>
          <div className={classes.Salesman}><img src={salesman} alt="Salesman" /></div>
          <div className={classes.Title}>ISell</div>
          {selectHarvester && <div className={classes.Descr}>
            <div className={classes.HavTitle}>{selectHarvester.name}</div>
            <div className={classes.HavSubTitle}>Harvester</div>
            <div className={classes.HavPerfomance}>Perfomance {selectHarvester.perfomance} in hour.</div>
            <div className={classes.HavDescr}>{selectHarvester.info}</div>
            <div className={classes.HavPrice}>Price {selectHarvester.price} 
              <svg width="14" height="20" viewBox="0 0 188 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M66.5917 120C36.9938 120 13 96.0472 13 66.5C13 36.9528 36.9938 13 66.5917 13H175M66.5917 120C66.5917 149.547 90.5855 173.5 120.183 173.5H146.214M66.5917 120C66.5917 90.4528 90.5855 66.5 120.183 66.5H146.214M121.408 120C151.006 120 175 143.953 175 173.5C175 203.047 151.006 227 121.408 227H13" stroke="#fff" strokeWidth="25"/>
              </svg></div>
            <div className={classes.HavPrice}>You have  {coins} 
              <svg width="14" height="20" viewBox="0 0 188 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M66.5917 120C36.9938 120 13 96.0472 13 66.5C13 36.9528 36.9938 13 66.5917 13H175M66.5917 120C66.5917 149.547 90.5855 173.5 120.183 173.5H146.214M66.5917 120C66.5917 90.4528 90.5855 66.5 120.183 66.5H146.214M121.408 120C151.006 120 175 143.953 175 173.5C175 203.047 151.006 227 121.408 227H13" stroke="#fff" strokeWidth="25"/>
              </svg></div>
            <div className={classes.HavPrice}>You may buy  {Math.floor(coins / selectHarvester.price)}</div>
            <div className={classes.Option}>
              {selectHarvester.price < coins && <Input 
                elementType={'input'} 
                elementConfig={{
                  type: 'number',
                  placeholder: 'Enter amount'
                }} 
                value={amount}
                changed={(e) => setAmount(+e.target.value)}
                invalid={false}
                min={1}
                max={Math.floor(coins / selectHarvester.price)}
              />}
              <Button btnType={'Success'} disabled={selectHarvester.price > coins} clicked={() => addHarvester({...selectHarvester, amount: amount}, amount * selectHarvester.price, amount, token, user)} >Buy</Button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    coins: state.user.coins,
    token: state.auth.token,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addHarvester: (harvester, price, amount, token, user) => dispatch(actions.addHarvester(harvester, price, amount, token, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);