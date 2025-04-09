import React from "react";
import Form from "../components/Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAuth } from "../../utils/fetchAuth";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { toastStyle } from "../configs/toastConfigs";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login } = useMutation({
    mutationFn: async (user) => {
      return await toast.promise(
        fetchAuth.post("/login", user),
        {
          loading: "Logging you in...",
          success: (res) => `Welcome back, ${res.data.user.name}!`,
          error: (err) =>
            `Something went wrong: ${
              err.response?.data?.message || err.message
            }`,
        },
        toastStyle
      );
    },
    onSuccess: () => {
      console.log("User logged in successfully");
      queryClient.invalidateQueries(["user"]);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error + "⛔️");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    login(user);
    setEmail("");
    setPassword("");
  };
  return (
    <Form
      handleSubmit={handleSubmit}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      title="Login"
      message="Welcome back! Please enter your details."
      footerText="Don't have an account ?"
      footerLink="Sign up"
      footerLinkHref="/"
    />
  );
};

export default LoginPage;
