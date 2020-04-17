import React from 'react';

import { useRoutes } from './Router';
import { BrowserRouter as Router } from 'react-router-dom' 

import { authInit, loadData } from '../redux/actions/authActions'
import { useSelector, useDispatch } from 'react-redux'

import wallpaperMojave from './static/media/imgs/wallpaperMojave.jpg'

import { ChangeAvatarWindow } from './App/ActionWIndows/ChageAvatarWindow'

const App = () => {

  const dispatch = useDispatch()

  dispatch(authInit())
  
  const isAuth = useSelector(state => state.auth.isAuth)
  const changeWindow = useSelector(state => state.user.changeAvatarWindow)
  const routes = useRoutes(isAuth)

  const token = useSelector(state => state.auth.token)

  if (isAuth) {
    dispatch(loadData(token))
  }

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
