import React from "react";
import styled from "styled-components";
import Pattern from "../components/Pattern";
import { Routes, Route } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "../pages/LoginPage";

const App = () => {
  return (
    <PageWrapper>
      <Pattern />
      <Routes>
        <Route index element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
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
