import './App.css';
import Feedback from './pages/Feedback';
import NavBar from './components/NavBar';
import Admin from './pages/Admin';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AdminDetails from './pages/AdminDetails';
import ShowNavBar from './ShowNavBar';
import User from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ShowNavBar>
          <NavBar/>
        </ShowNavBar>
          <Routes>
            <Route path='/' element={<User/>} />
            <Route path='/si' element={<SignIn/>} />
            <Route path='/su' element={<SignUp/>} />
            <Route path='/fb' element={<Feedback/>} />
            <Route path='/a' element={<Admin/>} />
            <Route path='/ad' element={<AdminDetails/>} />
            <Route path='*' element={<User/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
