"use client";

import { useState } from "react";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignUp = () => {
    const successful = registerUser(email, password);
    if (successful) {
      router.push("/auth/login"); // Weiterleitung zur Login-Seite
    } else {
      setMessage("User already exists.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h1>
        {message && (
          <p className="text-red-600 mb-4">{message}</p>
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
        <p className="text-center mt-4 text-gray-600">
          Already have an account? 
          <span 
            onClick={() => router.push("/auth/login")}
            className="text-green-500 hover:text-green-600 cursor-pointer underline"
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
}
