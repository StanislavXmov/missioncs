import React from 'react';
import { motion} from "framer-motion";
import classes from './TeamBot.module.scss';

const TeamBot = ({name, type, photo, info}) => (
    <motion.div initial={{scale:0.5, opacity: 0}} animate={{scale: 1, opacity: 1 }} className={classes.TeamBot}>
      <img src={photo} className={classes.BotImage} alt="BotImage" />
      <div className={classes.Block}>
        <div className={classes.Title}><h5>{name}</h5><span className={classes.SubTitle}>{type}</span></div>
        <p className={classes.Descr}>{info}</p>
      </div>
    </motion.div>
);

export default TeamBot;