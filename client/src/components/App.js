import React from 'react';
import { useRoutes } from '../Router';
import { BrowserRouter as Router } from 'react-router-dom'
import { authInit } from '../redux/actions/authActions'
import { useSelector } from 'react-redux'

const App = () => {

  authInit()

  const isAuth = useSelector(state => state.auth.isAuth)
  const routes = useRoutes(isAuth)

  return (
    <Router>
      <div className="App">
        { routes }
      </div>
      </Router>  
  );
}

export default App;
