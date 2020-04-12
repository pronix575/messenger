import React, { useEffect } from 'react';

import { useRoutes } from './Router';
import { BrowserRouter as Router } from 'react-router-dom' 

import { authInit } from '../redux/actions/authActions'
import { useSelector, useDispatch } from 'react-redux'

import wallpaperMojave from './static/media/imgs/wallpaperMojave.jpg'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authInit())
  })
  
  const isAuth = useSelector(state => state.auth.isAuth)
  const routes = useRoutes(isAuth)

  return (
    <Router>
      <div className="App">
        
        <div className="wallpaper" style={{ "backgroundImage": `url(${ wallpaperMojave })` }}></div>
        { routes }
      </div>
    </Router>  
  );
}

export default App;
