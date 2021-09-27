import React from 'react';

import "./styles.css"

export const MessageItem = ({ data, user }) => {
  return(
    <div 
      className="messageLine"
      style={{
        justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'
      }}
    >
      <div 
        className="messageItem"
        style={{
          backgroundColor: user.id === data.author ? '#dcf8c7' : '#fff'
        }}
      >
        <div className="messageText">{data.body}</div>
        <div className="messageDate">22:43</div>
      </div>
    </div>
  )
}