import { Component } from 'react';
import './App.css';
import LandingPageComponent from './components/LandingPageComponent';
import SignIn from './components/SigninComponent';
import MainComponent from './components/MainComponent';

class App extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    return this.state.redirect
      // ? <SignIn />
      ? <MainComponent />
      : <LandingPageComponent />;
  }
}

export default App;
