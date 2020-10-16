import React from 'react';

// import * as actions from '../../store/actions/index';
import classes from './Team.module.scss'
import { connect } from 'react-redux';
import TeamBot from '../../components/UI/Cards/TeamBot/TeamBot';
// import Spinner from '../../components/UI/Spinner/Spinner';

import AstroBot from '../../assets/images/astro/astroBot.png';
import YoBot from '../../assets/images/astro/YOYOBot.png';
import MrStyleBot from '../../assets/images/astro/astroStyle.png';
import MewBot from '../../assets/images/astro/MewBot.png';

const team = [
  {
    name: 'AstroBot',
    type: 'mechanic',
    info: "Я вот тут обычно чиню то, что они поломали, а иногда они ничего не ломают (редко конечно) и просто смотрю в космос.",
    photo: AstroBot
  },
  {
    name: 'YoYoBot',
    type: 'mechanic',
    info: "Я вот обычно чиню то, что AstroBot поломал, а иногда он ничего не ломает.",
    photo: YoBot
  },
  {
    name: 'MrStyleBot',
    type: 'navigator',
    info: "Отвечаю за навигацию. Но это больше как хобби. Я больше тут за стиль, мерч и корпоративы.",
    photo: MrStyleBot
  },
  {
    name: 'MewBot',
    type: 'PR SMM',
    info: "😊 Самый милый работник этой космической станции.",
    photo: MewBot
  },
];


const Team = () => {
  
  return (
    <div className={classes.Team}>
      {team.map(b => <TeamBot key={b.name} name={b.name} type={b.type} photo={b.photo} info={b.info} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Team);