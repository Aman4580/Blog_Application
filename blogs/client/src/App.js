import './App.css';
import Login from './components/account/Login';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import { useState } from 'react';
import CreatePost from './components/create/CreatePost';
import About from './components/about/About';
// Define the PrivateRoute component
const PrivateRoute = ({ isAuthenticate }) => {
  return isAuthenticate ? <>
  <Outlet />
  <Header /> </>:
   <Navigate replace to="/login" />;
};

function App() {
  const [isAuthenticate, setUserAuthenticate] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ marginTop: 64 }}>
        <Routes>
          <Route path="/login" element={<Login setUserAuthenticate={setUserAuthenticate} />} />
          <Route path="/" element={<PrivateRoute isAuthenticate={isAuthenticate} />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/create" element={<PrivateRoute isAuthenticate={isAuthenticate} />}>
            <Route index element={<CreatePost />} />
          </Route>
          <Route path="/about" element={<PrivateRoute isAuthenticate={isAuthenticate} />}>
            <Route index element={<About />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
