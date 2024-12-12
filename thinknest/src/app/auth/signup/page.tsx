"use client";
import { useState } from "react";
import { registerUser } from "@/lib/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Validierung der Eingaben
  const validateInputs = () => {
    if (!email || !password) {
      return "Please enter both email and password.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };

  const handleSignUp = () => {
    const validationError = validateInputs();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    const response = registerUser(email, password);

    if (response) {
      setMessage("Registration successful!");
    } else {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h1>
        {message && (
          <p className={`text-sm mb-4 ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}