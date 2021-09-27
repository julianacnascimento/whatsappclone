import React, { useState, useEffect } from "react"
import { addUser, chatList } from "./services/api";

import {ChatListItem} from "./components/ChatListItem";
import { ChatWindow } from "./components/ChatWindow";
import { ChatIntro } from "./components/ChatIntro";
import { NewChat } from "./components/NewChat";

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import "./App.css"
import { Login } from "./components/Login";

export default function App(){

  const [chatlist, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState({
    id: "9dFOyK36eaTyWuYLWCfLlNr2kj13",
    avatar: "https://lh3.googleusercontent.com/a-/AOh14GjmJTH3BUVV38UskC3BJ5FzsSOn8gmGlHaz861CbZo=s96-c"
  })
  const [showNewChat, setShowNewchat] = useState(false)

  useEffect(()=>{
    if(user !== null){
      let unsubscribe = chatList(user.id, setChatList);
      return unsubscribe;
    }
  },[user])

  const handleLoginData = async(user) => {
    let newUser = {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL
    }
    await addUser(newUser);
    setUser(newUser);
  }

  if(user === null) {
    return( <Login onReceive={handleLoginData} />)
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat 
          chatlist={chatlist}
          user={user}
          show={showNewChat}
          setShow={setShowNewchat}
        />
        <header>
          <img className="header--avatar" src={user.avatar} alt="avatar" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{color: "#919191"}} />
            </div>
            <div onClick={() => setShowNewchat(true)} className="header--btn">
              <ChatIcon style={{color: "#919191"}} />
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{color: "#919191"}} />
            </div>
          </div>
        </header>
        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize="small" style={{color: "#919191"}} />
            <input type="search" placeholder="Procurar ou começar uma nova conversa" />
          </div>
        </div>
        <div className="chatlist">
          { chatlist.map((item, key) =>(
            <ChatListItem 
              key={key}
              data={item}
              active={activeChat.chatId === chatlist[key].chatId}
              onClick={()=>setActiveChat(chatlist[key])}
            />
          ))}
        </div>
      </div>
      <div className="contentarea">
        {activeChat.chatId !== undefined &&
          <ChatWindow
            user={user}
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />
        }
      </div>
    </div>
  );
}