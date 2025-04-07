import React from "react";
import styled from "styled-components";
import Pattern from "../components/Pattern";
import Form from "../components/Form";

const App = () => {
  return (
    <PageWrapper>
      <Pattern />
      <Form />
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
