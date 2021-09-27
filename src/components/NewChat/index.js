import React, { useState, useEffect } from 'react';
import { getContactList, addNewChat } from "../../services/api";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import "./styles.css";

export const NewChat = ({ user, chatlist, setShow, show }) => {

  const [list, setList] = useState([]);

  useEffect(()=> {
    const getList = async() => {
      if(user !== null){
        let results = await getContactList(user.id);
        setList(results);
      }
    }
    getList();
  }, [user])

  const handleClose = () => {
    setShow(false);
  }

  const newChatAdd = async (user2) => {
    await addNewChat(user, user2);
    handleClose();
  }

  return(
    <div 
      className="newChat"
      style={{left: show ? 0 : -415}}
    >
      <div className="newChat--head">
        <div onClick={handleClose} className="newChat--backbutton">
          <ArrowBackIcon style={{color: "#fff"}} />
        </div>
        <div className="newChat--headtitle">Nova conversa</div>
      </div>
      <div className="newChat--list">
        {list.map((item, key) => (
          <div onClick={() => {newChatAdd(item)}} className="newChat--item" key={key}>
            <img className="newChat--itemavatar" src={item.avatar} alt="avatar" />
            <div className="newChat--itemname">{item.name}</div>
          </div>
        ))}
      </div>          
    </div>
  )
}