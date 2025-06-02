import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful:", user);
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col flex-grow justify-center items-center space-y-4 h-full"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="bg-[var(--primary-color)] text-[var(--secondary-color)] p-4 rounded-xl w-1/3"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="bg-[var(--primary-color)] text-[var(--secondary-color)] p-4 rounded-xl w-1/3"
      />
      <button
        type="submit"
        className="bg-[var(--tertiary-color)] text-[var(--secondary-color)] py-[0.6em] px-[1.2em]"
      >
        Login
      </button>
      <button type="button" onClick={handleGoogleSignIn}>
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 533.5 544.3"
        >
          <path
            fill="#4285F4"
            d="M533.5 278.4c0-18.5-1.5-37-4.8-54.6H272.1v103.6h146.6c-6.3 33.5-25 61.9-53.6 80.8v67h86.8c50.8-46.8 80.6-115.6 80.6-196.8z"
          />
          <path
            fill="#34A853"
            d="M272.1 544.3c72.8 0 134-24.2 178.7-65.8l-86.8-67c-24.1 16.1-55.1 25.6-91.8 25.6-70.8 0-130.8-47.8-152.2-112.4h-89.3v70.6c44.4 88 135.4 149.9 241.5 149.9z"
          />
          <path
            fill="#FBBC05"
            d="M119.9 323.7c-10.7-31.8-10.7-66.4 0-98.2v-70.6h-89.3c-38.6 75-38.6 164.3 0 239.3l89.3-70.5z"
          />
          <path
            fill="#EA4335"
            d="M272.1 107.7c39.6 0 75.3 13.6 103.3 40.1l77.3-77.3c-47.6-44.2-110.6-71.5-180.6-71.5-106 0-197.1 61.9-241.5 149.9l89.3 70.6c21.5-64.6 81.5-112.4 152.2-112.4z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SignIn;
