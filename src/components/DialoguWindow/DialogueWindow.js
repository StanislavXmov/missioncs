import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

import classes from './DialogueWindow.module.scss';
import astro from '../../assets/images/astro/astro1.png'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../UI/Backdrop/Backdrop';


// const messages = [
//   'Hello!',
//   'We are happy to see you in our team.',
//   'You can help in our mission.',
//   "Let's go, save the space!",
// ];

const DialogueWindow = ({name, messages, readedMessages, onReaded, screen }) => {

  let dialog = null;

  const [messageCounter, setMessageCounter] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const [botMessages, setBotMessages] = useState(null);
  const [idMessages, setIdMessages] = useState(null);
  const [readed, setReaded] = useState(false);

  useEffect(() => {
    if (messages) {
      const [homeMessage] = messages.filter(m => m[screen]);
      if (readedMessages.includes(homeMessage.id)) {
        setReaded(true);
      } else {
        setShowDialog(true); 
        setBotMessages(homeMessage[screen].m);
        setIdMessages(homeMessage.id);
      }
    }
  }, [messages, readedMessages, screen]);

  

  const nextMessageHandler = () => {
    setMessageCounter(messageCounter => messageCounter + 1);
    if (messageCounter >= botMessages.length - 1) {
      setShowDialog(false); 
      onReaded(idMessages);
    }
  }
  const closeDialogHandler = () => {
    setShowDialog(false);
  }

  
  if (messages && showDialog && readed === false) {
    dialog = <Auxiliary>
    <motion.div initial={{opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} ><Backdrop show={true} /></motion.div>
    <motion.div initial={{opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} >
    <div className={classes.DialogueWindow}>
      <div className={classes.Message}>
        <div className={classes.Bot}><h5>Bot1</h5></div>
        <div className={classes.Descr}><p>{botMessages ? botMessages[messageCounter] : null}</p></div>
        <div className={classes.Button} onClick={nextMessageHandler} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4e4e4e" width="32px" height="32px"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"/></svg>
        </div>
        <div className={classes.BtnClose} onClick={closeDialogHandler} >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e4e4e4" width="46px" height="46px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </div>
      </div>
      <img className={classes.DialoguePicture} src={astro} alt="Astronaut" />
    </div>
    </motion.div>
    </Auxiliary>
  }
  return <AnimatePresence>{dialog}</AnimatePresence>;
}

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    messages: state.messages.messages,
    readedMessages: state.messages.readedMessages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onReaded: (id) => dispatch(actions.messageReaded(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogueWindow);