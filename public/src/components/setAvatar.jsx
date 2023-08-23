import React from "react";
import { useNavigate, Link, json} from "react-router-dom";
import { useState,useEffect } from "react";
import styled from "styled-components";
import { ToastContainer,toast } from "react-toastify";
import loading from "../assets/loading.gif";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarsRoute } from "../utills/ApiRouter";

const SetAvatar = () => {
    const api = `https://api.multiavatar.com/4645646`;
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);
    const [isLoading,setIsLoading]=useState(true);
    const navigate=useNavigate();

    useEffect(async () => {
      const imageData = []
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        )
        const buffer = new Buffer(image.data)
        imageData.push(buffer.toString('base64'))
      }
      setAvatars(imageData)
      setIsLoading(false)
    }, [])

    const toastOptions={
        position:"top-middle",
        theme:"dark",
        autoClose:5000,
        draggable:true,
        pauseOnHover:true
    }
    const setProfilePicture=async()=>{
        if(selectedAvatar===undefined)
        {
            toast.error("first select any avatar",toastOptions)
        }
        else
        {
            const user = await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );
        const{data}=await axios.post(`${setAvatarsRoute}/${user._id}`,{image:avatars[selectedAvatar]});
        if(data.status==false)
        {
            toast.error(data.msg,toastOptions);

        }
        else{
            user.isAvatarImageSet=true;
            user.avatarImage=data.image;
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY,JSON.stringify(user));
            navigate('/')
        }

        }
    }

    return(
        <Container>
            <div className="title-container">
                <h1>pick any Avatar for your profile picture</h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar,index)=>{
                        return (
                          <div
                            className={`avatar ${
                              selectedAvatar === index ? 'selected' : ''
                            }`}
                          >
                            <img
                              src={`data:image/svg+xml;base64,${avatar}`}
                              alt="avatar"
                              key={avatar}
                              onClick={()=>setSelectedAvatar(index)}
                            />
                          </div>
                        )
                    })
                }
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>set as profile picture</button>
        <ToastContainer/>
        </Container>
    )


}

const Container=styled.div`

`