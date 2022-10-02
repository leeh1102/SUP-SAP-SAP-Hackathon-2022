
import './App.css';
import SignIn from './components/SigninComponent';
import MainComponent from './components/MainComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD

=======
>>>>>>> fa8669ab4a5cd67cc3bcc3c9e599179da8efddae

function App() {
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
