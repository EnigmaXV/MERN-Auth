import React from "react";
import styled from "styled-components";
import Pattern from "./components/Pattern";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <PageWrapper>
      <Pattern />
      <Routes>
        <Route index element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      <Toaster />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export default App;
