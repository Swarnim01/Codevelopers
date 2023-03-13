import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../css/profile.css';
import { UserContext } from '../App';
import socket from '../www/socket';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chat from './chat';
const Message = () =>{
  // const currentUser = useContext(LoggedInUserContext)
  const [user, setuser] = useState([]);
  const [value, setValue] = React.useState(0);
  const [message , setmessage] = useState(null);
  const [messages , setmessages] = useState([]);
  const [ selectedUser , setselectedUser] = useState(null);
  // useEffect(() => {
  //   console.log(currentUser.loggedInUser);
  // },[currentUser.loggedInUser])
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    console.log(event);
  };
  const sendMessage = () => {
    socket.emit("private message" , {
      content: message,
      to: selectedUser
    })
    const newMessage = {
      userID: localStorage.getItem('userID'),
      message,
    }
    setmessages([...messages , newMessage]);
    setmessage('');
    console.log(newMessage, "newMEssage sent");
  }
  const userConnected = useCallback((users) => {
    setuser(users);
    console.log(users);
  },[setuser])
  const userDisconnected  = useCallback((current) => {
    const userIndex = user.findIndex((u) => u.userID === current.userID);
          if(userIndex>=0){
            user[userIndex].connected = false;
            setuser([...user]);
          }
  },[user,setuser])
  const privateMessage = useCallback(({from , to ,content}) => {
    const newMessage = {
      userID: from,
      message: content,
    }
    setmessages([...messages , newMessage]);
    console.log(newMessage, "new came");
  },[messages,setmessages])
  useEffect(() => {
    socket.on("users", (users) =>userConnected(users) );
      socket.onAny((event, ...args) => {
        console.log(event, args);
      });
      socket.on("user disconnected", (current) => userDisconnected(current));
      socket.on('private message' , (message) => privateMessage(message))
      return () => {
        socket.off("users");
        socket.off("user disconnected");
        socket.off("private message")
      }
  },[privateMessage,userDisconnected, userConnected])

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
    return (
      <div style={{
        margin: '0px auto',
        maxWidth: '970px',
        marginTop: '5rem',
        padding: '0 0.5rem',
        border: '1px solid #ccc',
      }}>
      <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '80vh', width:'100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', width:'20%' }}
      >
        {user.length>0 ? user.map((item, index) => {
          return (
            <Tab label={`${item.username} | ${item.connected ? "online" : "offline"}`} {...a11yProps(index)} onClick={() => {setselectedUser(item.userID); console.log(item.userID)}}/>
          )
        }) : <p> No user connected</p>}
          </Tabs>
      {user.length>0 ? user.map((item, index) => {
        return(
          <TabPanel value={value} index={index}>
          <div style={{backgroundColor:'black' , height:'70vh', width:'50vw', display:'flex' , flexDirection:'column', justifyContent:'space-between' , overflowY:'scroll'}}>
            <div style={{display:'flex' , flexDirection:'column'}}>
            {messages.length > 0 && messages.map((data) => {
              console.log(data);
              return(
                <Chat data ={data}/>
              )
            })}
            </div>
          <div >
          <input type="text" placeholder="message" style={{width:'45vw'}} value={message} onChange={(e) => setmessage(e.target.value)} />
          <button onClick={sendMessage} style={{marginLeft:'0.2rem'}}>send</button>
        </div>
          </div>
        </TabPanel>)
      }) : <div>Start Messaging to friend</div>}
    </Box>
    </div>
    );
}

export default Message;