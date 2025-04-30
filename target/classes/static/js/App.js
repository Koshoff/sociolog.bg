import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SurveyList from './components/SurveyList';
import SurveyDetail from './components/SurveyDetail';
import CreateSurvey from './components/CreateSurvey';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/surveys" component={SurveyList} />
              <Route path="/survey/:id" component={SurveyDetail} />
              <PrivateRoute path="/create-survey" component={CreateSurvey} />
              <PrivateRoute path="/profile" component={Profile} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 