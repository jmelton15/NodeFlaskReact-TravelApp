import "./NotificationBar.css";
import { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentAlt,faUser,faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { Badge, Collapse, Button, CardBody, Card  } from 'reactstrap';


const NotificationBar = ({messages,goToPage,user}) => {
    return (
    <div className="container-fluid NotificationBar-Container">
      <div className="d-flex align-items-center NotificationBar-MessageIconContainer" onClick={()=>goToPage(`users/${user.user_id}/messages`)}>
      <FontAwesomeIcon 
          className="NotificationBar-MessageIcon NotificationBar-Icons" 
          icon={faCommentAlt} 
          size="lg" 
          color="#6c757d"
      />
      <h4><Badge color="secondary" id="icon-badge">Check Messages</Badge></h4>
      </div>
      <div className="d-flex align-items-center" onClick={()=>goToPage("users/find")}>
      <FontAwesomeIcon className="NotificationBar-UserIcon NotificationBar-Icons" icon={faUserPlus} size="lg" color="#6c757d"/>
      <h4><Badge color="secondary" id="icon-badge">Search Users</Badge></h4>
      </div>
    </div>
    )
}

export default NotificationBar;

