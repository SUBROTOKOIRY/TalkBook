import {useState,useEffect} from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Message from './Message'
import axios from 'axios'
import {getAllMsgsRoute} from '../utills/ApiRouter'
import {addMsgRoute} from '../utills/ApiRouter' //mistake, i was writing addMsgRoute only without curly braces 
const ChatContainer = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const allMsgs=async()=>{
      try{
        const res=await axios.post(getAllMsgsRoute,{
          from:props.currentUser._id,
          to:props.currentChat._id
        })
          console.log(res.data.pastMessages)
          if(res.data.status===true){
            setMessages(res.data.pastMessages)
          }
          else{
            console.log(res.data.msg)
          }
      }
      catch(err){
        console.log(err)
      }
    }
    allMsgs();
  },[props.currentChat])

  const handleSendMsg = async (msg) => {
    try{
    console.log(msg)
    const res =await axios.post(addMsgRoute, {
      from: props.currentUser._id,
      to: props.currentChat._id,
      text: msg,
    })
    console.log(res.data.msg)  //mistake, i was writing res.msg
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/png+xml;base64,${props.currentChat.profilePicture}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{props.currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div >
              <div
                className={`message ${
                  message.fromSender ? 'sended' : 'received'
                }`}
              >
                <div className="content ">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
        overflow-y: auto;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`
export default ChatContainer
