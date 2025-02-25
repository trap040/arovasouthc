// src/app/admin/signin/page.tsx

"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Try different navigation methods
      console.log("Navigation attempt 1");
      window.location.href = "/dashboard";
      
      // Backup navigation attempts if the first one fails
      setTimeout(() => {
        console.log("Navigation attempt 2");
        window.location.replace("/dashboard");
      }, 1000);
      
      setTimeout(() => {
        console.log("Navigation attempt 3");
        document.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-nero flex items-center justify-center p-4">
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 rounded bg-nero text-white"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 rounded bg-nero text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-lion text-white p-3 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}