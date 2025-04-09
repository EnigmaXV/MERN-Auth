import React from "react";
import styled from "styled-components";

const SubmitButton = ({ onHandleClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onHandleClick}>Button</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-size: 17px;
    padding: 0.5em 2em;
    border: transparent;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    background-color: #08b908cd;
    color: white;
    border-radius: 4px;
  }

  button:hover {
    background-color: #08b908;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
    transform: translate(0em, 0.1em);
    transition: transform 0.1s ease-in-out;
  }

  button:active {
    transform: translate(0em, 0.2em);
  }
`;

export default SubmitButton;
