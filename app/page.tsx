"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import BookmarkList from "../components/BookmarkList";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-2xl">
        {!user ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Smart Bookmark App
            </h1>
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login with Google
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">
                My Bookmarks
              </h1>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>

            <BookmarkList user={user} />
          </>
        )}
      </div>
    </div>
  );
}
