'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This calls the 'authorize' function from auth.ts
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 border rounded shadow-md space-y-4">
        <h1 className="text-xl font-bold">Login</h1>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 w-full text-black" />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 w-full text-black" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Sign In</button>
      </form>
    </div>
  );
}