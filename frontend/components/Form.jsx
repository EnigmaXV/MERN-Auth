import React from "react";
import styled from "styled-components";

const Form = ({
  handleSubmit,
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  title,
  message,
  footerText,
  footerLink,
  footerLinkHref,
}) => {
  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit} className="form">
        <p className="title">{title} </p>
        <p className="message">{message} </p>

        {title === "Register" && (
          <label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              type="text"
              placeholder
              required
            />
            <span>Name</span>
          </label>
        )}

        <label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            placeholder
            required
          />
          <span>Email</span>
        </label>
        <label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            placeholder
            required
          />
          <span>Password</span>
        </label>

        <button className="submit">Submit</button>
        <p className="signin">
          {footerText} <a href={`${footerLinkHref}`}>{footerLink}</a>{" "}
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    padding-right: 30px;
    padding-left: 17px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
    z-index: 1;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background-color: rgba(26, 26, 26, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #08b908cd;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #0f0;
  }

  .message,
  .signin {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .signin a {
    color: #0f0;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 1.5rem;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 11px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #08b908cd;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: 0.3s ease;
    background-color: #08b908cd;
  }

  .submit:hover {
    background-color: #0f0;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default Form;
