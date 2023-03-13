import React, { useEffect, useState } from 'react';
import '../css/chat.css';
const Chat = ({data : { userID , message}}) =>{
  console.log(userID , message);
    return (
      <span className={userID === localStorage.getItem('userID')? 'right' : 'left'}>
        {message}
      </span>
    );
}

export default Chat;