import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import './App.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { AnimatePresence } from 'framer-motion'

import Landingpage from './pages/Landingpage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

import CallReducer from './features/CallFeature.js'
import SidebarReducer from './features/Sidebar.js'
import ChatReducer from './features/Chat.js'
import ControlReducer from './features/Control.js'
import FriendsReducer from './features/Friends.js'
import UserinfoReducer from './features/Userinfo.js'

const store = configureStore({
  reducer: {
    call: CallReducer,
    sidebar: SidebarReducer,
    chat: ChatReducer,
    control: ControlReducer,
    friends: FriendsReducer,
    userinfo: UserinfoReducer
  }
})

function App() {


  return (
    <div className="app">
    <AnimatePresence mode='wait'>

      <Provider store={store}>

        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>

      </Provider>

    </AnimatePresence>
    </div>
  )
}

export default App
