import React from "react";
import VerificationInput from "react-verification-input";
import styled from "styled-components";
import SubmitButton from "../components/SubmitButton";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAuth } from "../../utils/fetchAuth";
import { toast } from "react-hot-toast";
import { toastStyle } from "../configs/toastConfigs";
import { useNavigate } from "react-router-dom";

const EmailVerificationPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const { mutate: verifyEmail } = useMutation({
    mutationFn: async (code) => {
      return await toast.promise(
        fetchAuth.post("/verify-email", { code }),
        {
          loading: "Verifying your email...",
          success: "Email verified successfully!",
          error: (err) =>
            `Something went wrong: ${
              err.response?.data?.message || err.message
            }`,
        },
        toastStyle
      );
    },
    onSuccess: () => {
      console.log("Email verified successfully");
      queryClient.invalidateQueries(["user"]);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error + "⛔️");
    },
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        verifyEmail(code);
        setCode("");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [code, verifyEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmail(code);
    setCode("");
  };

  return (
    <StyledWrapper>
      <h2 style={{ fontFamily: "roboto-condensed", color: "#08b908cd" }}>
        Enter the verification code sent to your email
      </h2>
      <VerificationInput
        value={code}
        onChange={(e) => setCode(e)}
        classNames={{
          container: "container",
          character: "character",
          characterInactive: "character--inactive",
          characterSelected: "character--selected",
          characterFilled: "character--filled",
        }}
        placeholder="-"
        autoFocus
      />
      <SubmitButton onHandleClick={handleSubmit} c />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35rem;
  height: 15rem;
  overflow: hidden;
  border-radius: 10px;
  background-color: #1a1a1a;
  margin: 0 auto;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  background-color: rgba(26, 26, 26, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 0.5px solid #333;

  .character {
    border: none;
    font-size: 20px;
    border-radius: 8px;

    /* light theme */
    color: #272729;
    outline-color: #08b908cd;
    background-color: #f6f5fa;
    box-shadow: 0 2px 0 #e4e2f5;

    /* dark theme */
    color: #fff;
    background-color: #222;
    box-shadow: 0 2px 0 #444;
  }
`;

export default EmailVerificationPage;
