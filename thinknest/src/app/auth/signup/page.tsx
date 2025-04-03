"use client";

import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import logo from "../../../../public/assets/img/thinknest_logo.png"


export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="row flex flex-wrap -mx-4 bg-[#28AD5E] shadow-md ">
          <div className="col w-full md:w-1/2 px-4">
              <div className="mt-40 rounded-lg p-8 space-y-6">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-700">E-Mail</label>
                    <input
                      type="email"
                      placeholder="E-Mail"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Passwort</label>
                    <input
                      type="password"
                      placeholder="Passwort"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  >
                    Registrieren
                  </button>
                  <div className="text-center text-sm">
                    <a href="/auth/login" className="text-blue-500 hover:text-blue-600">
                      Already have an account?
                    </a>
                  </div>
                </form>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </div>
          </div>
          <div className="col w-full md:w-1/2 px-4 relative bg-black">
            <img src={logo.src} alt="Logo"/>
          </div>
        </div>
      </div>
    </div>

  );
}
