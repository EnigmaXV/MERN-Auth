import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <Container>
      <Header>
        <h1>Welcome to Advanced Auth</h1>
        <p>Secure and seamless authentication for your applications.</p>
      </Header>
      <Main>
        <Section>
          <h2>Features</h2>
          <ul>
            <li>Secure Login</li>
            <li>Token-based Authentication</li>
            <li>Role-based Access Control</li>
          </ul>
        </Section>
        <Section>
          <h2>Get Started</h2>
          <p>Sign up today and experience the best authentication system.</p>
          <Button>Sign Up</Button>
        </Section>
      </Main>
      <Footer>
        <p>
          &copy; {new Date().getFullYear()} Advanced Auth. All rights reserved.
        </p>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  color: #333;
  background-color: #f4f4f4;
  overflow: hidden;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  width: 80%;
  position: absolute;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Main = styled.main`
  margin: 20px 0;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Footer = styled.footer`
  margin-top: 20px;
  font-size: 14px;
  color: #777;
`;

export default HomePage;
