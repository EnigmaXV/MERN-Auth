import React from "react";
import Form from "../components/Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAuth } from "../utils/fetchAuth";
import { toast } from "react-hot-toast";
import { useState } from "react";

const SignupPage = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signup } = useMutation({
    mutationFn: async (user) => {
      return await toast.promise(
        fetchAuth.post("/signup", user),
        {
          loading: "Creating your account...",
          success: (res) => `Welcome, ${res.data.user.name}! `,
          error: (err) =>
            `Something went wrong: ${err.response?.data?.msg || err.message}`,
        },
        {
          style: {
            minWidth: "250px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "5px",
            padding: "10px",
          },
          success: {
            duration: 5000,
            icon: "✅",
          },
        }
      );
    },
    onSuccess: () => {
      console.log("User created successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password };
    signup(user);
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <Form
        handleSubmit={handleSubmit}
        name={name}
        email={email}
        password={password}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        title="Register"
        message="Signup now and get full access to our app."
        footerText="Already have an account ?"
        footerLink="Sign in"
        footerLinkHref="/login"
      />
    </div>
  );
};

export default SignupPage;
