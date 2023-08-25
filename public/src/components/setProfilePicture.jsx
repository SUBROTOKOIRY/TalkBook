import React from "react";
import { useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import styled from "styled-components";
import { ToastContainer,toast } from "react-toastify";
import loader from "../assets/loader.gif";
import axios from "axios";
import { Buffer } from "buffer";
import { setProfilePictureRoute } from "../utills/ApiRouter";

const SetAvatar = () => {
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar,setSelectedAvatar]=useState();
    const [isLoading,setIsLoading]=useState(true);
    const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.YOUR_API_KEY // Replace with your actual API key
        const apiUrl = `https://api.multiavatar.com/Starcrasher.png?apikey=${apiKey}`

        const data = []
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(
            `${apiUrl}/${Math.floor(Math.random() * 1000)}`,
            {
              responseType: 'arraybuffer', // Important for handling binary data
            }
          )

          if (response.data) {
            const buffer = Buffer.from(response.data, 'binary')
            data.push(buffer.toString('base64'))
          }
        }
        setAvatars(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching images:', error)
        // Handle the error as needed
      }
    }

    fetchData()
  }, [])

    const toastOptions={
        position:"top-middle",
        theme:"dark",
        autoClose:5000,
        draggable:true,
        pauseOnHover:true
    }
    const setProfilePicture=async()=>{
        if(selectedAvatar==="")
        {
            toast.error("first select any avatar",toastOptions)
        }
        else
        {
            const user = await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );
        // const{data}=await axios.post(`${setAvatarsRoute}/${user._id}`,{image:avatars[selectedAvatar]});
       try {
         const { data } = await axios.post(`${setProfilePictureRoute}/${user._id}`, {
           image: avatars[selectedAvatar],
         })
         // Handle successful response
         if (data.status === false) {
           toast.error(data.msg, toastOptions)
         } else {
           user.isProfilePictureSet = data.isSet;
           user.profilePicture = data.image;
          //  console.log(data.profilePicture)
           localStorage.setItem(
             process.env.REACT_APP_LOCALHOST_KEY,
             JSON.stringify(user)
           )
           navigate('/')
         }
       } catch (error) {
         console.error('Error making POST request:', error)
         // Handle the error
       }

        }
    }

    return (
      <>
        {isLoading ? (
          <Container>
            <img key='0' src={loader} alt="loader" className="loader" />
          </Container>
        ) : (
          <Container>
            <div className="title-container">
              <h1>Pick an Avatar as your profile picture</h1>
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${
                      selectedAvatar === index ? 'selected' : ''
                    }`}
                  >
                    <img
                      src={`data:image/png+xml;base64,${avatar}`}
                      alt="avatar"
                      key={avatar}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                )
              })}
            </div>
            <button onClick={setProfilePicture} className="submit-btn">
              Set as Profile Picture
            </button>
            <ToastContainer />
          </Container>
        )}
      </>
    )


}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`
export default SetAvatar;