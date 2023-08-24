import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import SetAvatar from './components/setProfilePicture'
import Chat from './pages/Chat'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/setProfilePicture" element={<SetAvatar />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
