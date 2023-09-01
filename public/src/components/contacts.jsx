import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { useState,useEffect } from 'react'
function Contacts(props) {
    const [currentSelected,setCurrentSelected]=useState(undefined);
    const [currentUsername,setCurrentUsername]=useState(undefined);
    const [currentProfilePicture,setCurrentProfilePicture]=useState(undefined);
    
    useEffect(() => {
       const data=JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        
        if(data)
        {
          setCurrentUsername(data.username)
          setCurrentProfilePicture(data.profilePicture)
        }
    },[])
    const changeCurrentChat=(index,contact)=>{
        setCurrentSelected(index);
        props.changeChat(contact);
    }
  return (
    <>
      {currentUsername && currentProfilePicture && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>TalkBook</h3>
          </div>
          <div className="contacts">
            {props.contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/png+xml;base64,${contact.profilePicture}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/png+xml;base64,${currentProfilePicture}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUsername}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 4rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`
export default Contacts
