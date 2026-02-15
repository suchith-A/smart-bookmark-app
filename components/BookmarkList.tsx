"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("realtime bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addBookmark = async () => {
    if (!title || !url) return;

    let formattedUrl = url;

    // Auto-add https if missing
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    await supabase.from("bookmarks").insert([
      {
        title,
        url: formattedUrl,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Title"
          className="border p-2 flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="URL"
          className="border p-2 flex-1"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={addBookmark}
          className="bg-green-600 text-white px-4"
        >
          Add
        </button>
      </div>

      <ul>
        {bookmarks.map((bookmark) => (
          <li
            key={bookmark.id}
            className="bg-white p-3 mb-2 rounded shadow flex justify-between"
          >
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {bookmark.title}
            </a>
            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
