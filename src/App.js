import {useState} from 'react';
import Home from './components/HomePage/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Navbar from './components/HomePage/Navbar';
import Notifications from './components/Navbar/Notifications';
import SearchPage from './components/Navbar/SearchPage';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Videos from './components/Navbar/Videos';
import Setting from './components/Navbar/Setting';
import Options from './components/Navbar/Options';
import Chat from './components/HomePage/Chat';
import UserProfile from './components/UserProfile';
import ChattingPage from './components/Messanger/ChattingPage';
import ConvsersationState from './context/GetMessage';

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState(false);

  const handleClick = () => {
    setShow(!show);
  }

  

  return (
    <>

    <ConvsersationState>

      <Router>

        <Navbar handleClick={handleClick}/>
        <Options show={show} handleClick={handleClick}/>
        <Chat notification={notification}/>
        <Routes>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/signup" element={<Signup />}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/search" element={<SearchPage/>}/>
          <Route exact path="/notifications" element={<Notifications/>}/>
          <Route exact path="/videos" element={<Videos/>}/>
          <Route exact path="/setting" element={<Setting/>}/>
          <Route exact path="/profile" element={<UserProfile/>}/>
          <Route exact path="/chatting" element={<ChattingPage setNotification={setNotification}/>}/>

        </Routes>

      </Router>

    </ConvsersationState>


    </>
  );
}

export default App;
