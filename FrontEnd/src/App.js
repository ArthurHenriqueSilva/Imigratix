import React, { createContext, useState } from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import HideScreen from './pages/HideScreen';
import PrivateRoutes from './utils/PrivateRoutes';

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState({ loggedIn: false });
  return (
  <UserContext.Provider value={{ user, setUser }}>
    <Router>
      <Routes>
        <Route path="/loginscreen" element={<LoginScreen />} />
        <Route exact path="/" element={<Home />} />
        <Route element={<PrivateRoutes />}> 
          <Route path="/hide" element={<HideScreen />} />  
        </Route>
      </Routes>
    </Router>
  </UserContext.Provider>   
  );
};

export default App;
