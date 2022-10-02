import { Component } from 'react';
import './App.css';
import LandingPageComponent from './components/LandingPageComponent';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/SigninComponent';
import MainComponent from './components/MainComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<div className='App'><SignIn /></div>} />
        <Route path='/home' element={<div className='App'><MainComponent /></div>} />
      </Routes>
    </Router>
  )
}

export default App;
