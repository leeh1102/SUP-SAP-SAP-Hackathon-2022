import { Component } from 'react';
import './App.css';
import LandingPageComponent from './components/LandingPageComponent';
import SignIn from './components/LoginComponent';

class App extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    return this.state.redirect
      ? <SignIn /> : <LandingPageComponent />;
  }
}

export default App;
