import React, { useEffect,useState,useRef } from 'react'
import styled from 'styled-components'
import { allUsersRoute,host} from '../utills/ApiRouter'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'
const Chat = () => {
   const socketRef = useRef();
  const navigate = useNavigate();
  const [currentUser,setCurrentUser]=useState(undefined);
  const [contacts,setContacts]=useState([]);
  const [currentChat,setCurrentChat]=useState(undefined);

  //connecting to socket.io server when the user is logged in
  useEffect(() => {
    if(currentUser)
  {
    try{
      socketRef.current = io(host);
      socketRef.current.emit('add-user', currentUser._id)
      // console.log('connecting to socket.io server')
    }
    catch(err){ 
      console.log(err)
    }
  }
  },[currentUser]);  

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY) === null) {
      console.log('user not logged in')
      navigate('/login')
    }
    else{
      setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)))
    }
  },[])
  useEffect(() => {
      if(currentUser)
      {
            if (currentUser.isProfilePictureSet === false) {
              navigate('/setProfilePicture')
            } else {
              const fetchData=async()=>{
                const data=await axios.get(`${allUsersRoute}/${currentUser._id}`)
                setContacts(data.data);

              }
              fetchData();
            }

      }
  },[currentUser,navigate])

  const handleChatChange=(chat)=>{
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socketRef={socketRef}/>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`
export default Chat