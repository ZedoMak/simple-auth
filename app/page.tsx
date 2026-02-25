'use client';
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl">Welcome back, {session.user?.name}!</h1>
        <p className="text-gray-500">{session.user?.email}</p>
        <button 
          onClick={() => signOut()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">You are not logged in</h1>
      <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
        Go to Login
      </Link>
    </div>
  );
}