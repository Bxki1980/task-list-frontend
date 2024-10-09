import React, { Component } from 'react'
import Navbar from './components/navbar';
import Home from './screens/home';
import Login from './screens/login';
import TaskList from './screens/taskList';
import Footer from './components/footer';
import ForgotPassword from './components/ForgotPassword';
import ContactMe from './screens/contactMe';
import Aboutme from './screens/aboutMe';
import SignUp from './components/SignUp';
import './styles/global.css'
import {Route, Routes} from 'react-router-dom';

class App extends Component {
    state = {  } 
    render() { 
        return (
                <>
                <Navbar />
                <div className='container mt-3'>
                    <Routes>
                 <Route path='/' element={<Home/>} />
                 <Route path='/login' element={<Login/>} />
                 <Route path='/tasklist' element={<TaskList/>} />
                 <Route path='/contactMe' element={<ContactMe/>} />
                 <Route path='/aboutMe' element={<Aboutme/>} />
                 <Route path="/signup" element={<SignUp />} />
                 <Route path="/forgot-password" element={<ForgotPassword />} /> 
                 </Routes>
                 <Footer/>
              </div>
             </>
        );
    }
}
 
export default App;