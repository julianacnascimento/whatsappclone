import React from "react";
import "./styles.css";

export const ChatListItem = ({onClick, active, data}) =>{
  return(
    <div 
      className={`chatListItem ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <img className="chatListItem--avatar" src={data.image} alt="" />
      <div className="chatListItem--lines">
        <div className="chatListItem--line">
          <div className="chatListItem--name">{data.title}</div>
          <div className="chatListItem--date">22:15</div>
        </div>
        <div className="chatListItem--line">
          <div className="chatListItem--lastMsg">
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}