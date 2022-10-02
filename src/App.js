import { Component, state } from 'react';
import './App.css';
import LandingPageComponent from './components/LandingPageComponent';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/SigninComponent';
import MainComponent from './components/MainComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";



function App() {
  state = {
    // title: '',
    // location: '',
    // description: ''
    userName: "",
    password: ""
  }
  componentDidMount = () => {
    this.getDataPosts();
  }
  getDataPosts = () => {
    axios
      .get("/api/users")
      .then((response) => {
        console.log(response);
        const data = response.data;
        this.setState({ posts: data });

        console.log("Data has been received");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path='/home' element={<MainComponent />} />
      </Routes>
    </Router>
  )
}

export default App;
