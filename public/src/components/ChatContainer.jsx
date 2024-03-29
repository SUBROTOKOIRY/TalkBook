import {useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Message from './Message'
import axios from 'axios'
import {getAllMsgsRoute} from '../utills/ApiRouter'
import { v4 as uuidv4 } from 'uuid';
import {addMsgRoute} from '../utills/ApiRouter' //mistake, i was writing addMsgRoute only without curly braces 


const ChatContainer = (props) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
 
  const scrollRef = useRef();

            //getting all the chats between the two users(currentUser and CurrentChat)
  useEffect(() => {
    const allMsgs=async()=>{
      if(props.currentChat)
      {
        const res=await axios.post(getAllMsgsRoute,{
          from:props.currentUser._id,
          to:props.currentChat._id
        })
          if(res.data.status===true){
            setMessages(res.data.pastMessages)
          }
          else{
            console.log(res.data.msg)
          }
      }
    }
    allMsgs();
  },[props.currentChat])

  const handleSendMsg = async (msg) => {
    try{
      
      await axios.post(addMsgRoute, {
        from: props.currentUser._id,
        to: props.currentChat._id,
        text: msg,
      })

       //sending msg to socket.io server
      props.socketRef.current.emit('send-msg',{
      from:props.currentUser._id,
      to:props.currentChat._id,
      text:msg
      });

        const msgs = [...messages]
        msgs.push({ fromSender: true, text: msg })
        setMessages(msgs)
    // console.log(res.data.msg)  //mistake, i was writing res.msg
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
     if (props.socketRef.current) {
       props.socketRef.current.on('msg-receive', (msg) => {
         setArrivalMessage({ fromSender: false, text: msg })
        })
        // console.log("msg received");
     }
  }, []);

   useEffect(() => {
     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
   }, [arrivalMessage])

   useEffect(() => {
     scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
   }, [messages])

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
            <div ref={scrollRef} key={uuidv4()}>
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
