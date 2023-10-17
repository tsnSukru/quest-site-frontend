import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Authentication from './components/Authentication/Authentication'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route
            path="/authentication"
            element={
              localStorage.getItem("currentUser") != null ? (<Navigate to="/home" replace />) : (<Authentication />)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
