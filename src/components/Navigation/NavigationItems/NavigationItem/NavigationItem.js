import React from 'react';
import classes from './NavigationItem.module.scss';
import { NavLink } from 'react-router-dom';


const NavigationItem = ({children, link, exact, icon}) => (
  <li className={classes.NavigationItem} >
    <NavLink 
      to={link}  
      className={classes.Item}
      activeClassName={classes.active}
      exact={exact}
    >
      {/* <img className={classes.Icon} src={icon} /> */}
      {/* <svg className={classes.Icon} viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10.5" y="10.5" width="299" height="299" rx="26.5" stroke="black" />
        <path d="M195.132 270V253.583H232.422L279 174.78L252.341 125.356L228.244 138.535L204.147 151.714L229.429 198.585H195.132V182.168L168.087 226.084L195.132 270Z" fill="black"/>
        <path d="M241.341 79.7338L227.203 88.0887L208.226 56L116.663 56.0226L87.6704 104.115L111.282 118.144L134.894 132.173L162.389 86.5644L179.843 116.078L165.706 124.433L217.287 125.356L241.341 79.7338Z" fill="black"/>
        <path d="M64.6533 142.146L50.1871 134.374L101.688 131.35L127.581 175.955L113.115 168.183L96.8784 198.383L150.148 198.31L150.353 225.767L150.557 253.224L94.3873 253.301L47 174.982L64.6533 142.146Z" fill="black"/>
      </svg> */}
      <div className={classes.Icon}>
        {icon}
      </div>
      
      <div>
        {children}
      </div>
    </NavLink>
  </li>
);

export default NavigationItem;