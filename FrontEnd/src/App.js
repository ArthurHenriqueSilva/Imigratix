import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import { UserProvider } from "./components/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Home />} />
          <Route path="/Sign" element={<Sign />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
