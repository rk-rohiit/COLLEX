import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Layout from "./components/layouts/Layout";
import LoginPage from "./components/pages/LoginPage";
const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login-page" element={<LoginPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
