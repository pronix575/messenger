import React, { useEffect, useState } from 'react';

import { useRoutes } from './Router';
import { BrowserRouter as Router } from 'react-router-dom' 

import { authInit } from '../redux/actions/authActions'
import { newMessage } from '../redux/actions/chatsActions'
import { useSelector, useDispatch } from 'react-redux'

import wallpaperMojave from './static/media/imgs/wallpaperMojave.jpg'

import { ChangeAvatarWindow } from './App/ActionWIndows/ChageAvatarWindow'
import { setDeviceType } from '../redux/actions/appActions';

import { socket } from '../sockets/socket'

const App = () => {

  const [time, setTime] = useState(false)
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(authInit())
    dispatch(setDeviceType((window.innerWidth <= 500) ? true : false))
    
    window.addEventListener("resize", () => {
        dispatch(setDeviceType(((window.innerWidth <= 500) ? true : false)))
    })
  }, [dispatch])
  
  const isAuth = useSelector(state => state.auth.isAuth)
  const changeWindow = useSelector(state => state.user.changeAvatarWindow)
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)

  const routes = useRoutes(isAuth)
  

  useEffect(() => {
    socket.emit('setOnline', {
      token, userId
    })

    if (!time) {
 
      socket.on('newMessage', ({ shortid, message }) => {
        dispatch(newMessage(message, shortid))
      })
      setTime(true)
      setTimeout(() => {
        setTime(false)
      }, 350)
    }

  }, [token, userId, dispatch])

  return (
    <Router>
      <div className="App">
        { changeWindow && <ChangeAvatarWindow /> }
        <div className="wallpaper" style={{ "backgroundImage": `url(${ wallpaperMojave })` }}></div>
        { routes }
      </div>
    </Router>  
  );
}

export default App;
