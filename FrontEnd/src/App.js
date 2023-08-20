import React, { createContext, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginScreen from "./pages/LoginScreen";
// import HideScreen from "./pages/HideScreen";
// import PrivateRoutes from "./utils/PrivateRoutes";

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState({ loggedIn: false });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
