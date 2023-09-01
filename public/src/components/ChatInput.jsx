import {React,useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { BiSmile } from 'react-icons/bi'
import { IoMdSend } from 'react-icons/io'

const ChatInput = (props) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg,setmsg]=useState('');
    const handleEmojiPicker = (e) => {
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick=(emojiObject)=>{
        let message=msg;
        message+=emojiObject.emoji;
        setmsg(message);
    }
    const sendChat=(e)=>{
        e.preventDefault();
        props.handleSendMsg(msg);
        setmsg('');
    }
    return (
    <Container>
      <div className="emoji-container">
        <div className="emoji">
            <BiSmile onClick={handleEmojiPicker}/>
            {showEmojiPicker && 
                <Picker onEmojiClick={handleEmojiClick}/>
            }
        </div>
      </div>
      <form action="" className="input-container" onSubmit={sendChat}>
        <input type="text" placeholder="Type a message" value={msg} onChange={(e)=>setmsg(e.target.value)}/>
        <button type="submit">{IoMdSend()}</button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .emoji-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -470px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;

         ::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        input.epr-search {
          background: transparent;
          border: 0.1rem solid #9a86f3;
        }

        .epr-emoji-category-label {
          background-color: transparent;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`
export default ChatInput;