import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastStyle } from "../configs/toastConfigs";
import { toast } from "react-hot-toast";
import { fetchAuth } from "../../utils/fetchAuth";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const queryClient = useQueryClient();
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const { mutate: resetPassword } = useMutation({
    mutationFn: async (newPassword) => {
      return await toast.promise(
        fetchAuth.post(`/reset-password/${token}`, { newPassword }),
        {
          loading: "Updating your password...",
          success: "Password updated successfully!",
          error: (err) =>
            `Something went wrong: ${
              err.response?.data?.message || err.message
            }`,
        },
        toastStyle
      );
    },
    onSuccess: () => {
      console.log("Password updated successfully");
      queryClient.invalidateQueries(["user"]);
      navigate("/login");
    },
    onError: (error) => {
      console.log(error + "⛔️");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(newPassword);
    setNewPassword("");
  };

  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <p className="heading">Please enter your new password</p>
        <label htmlFor="newPassword">New password:</label>
        <input
          required
          placeholder="Enter your new password"
          name="newPassword"
          id="newPassword"
          type="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input defaultValue="Subscribe" type="submit" />
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .newsletter-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 2px solid #333;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background-color: rgba(26, 26, 26, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .heading {
    font-weight: bold;
    font-size: 20px;
    color: #08b908cd;
  }

  .newsletter-form label {
    display: block;
    font-weight: bold;
    color: #666;
    margin-bottom: 10px;
  }

  .newsletter-form input[type="newPassword"] {
    width: 90%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .newsletter-form input[type="submit"] {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #08b908cd;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }

  .newsletter-form input[type="submit"]:hover {
    background-color: #08b908;
  }
`;

export default ResetPasswordPage;
