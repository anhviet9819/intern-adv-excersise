import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';

function App() {
  const token = localStorage.getItem('token');

  if(!token) {
    // return <Register />
    return <Login />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Profile />
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
