"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
        },
      );
      setTitle("");
      setBody("");
      setResponse(
        `post created successfully: ${JSON.stringify(response.data)}`,
      );
    } catch (error) {
      console.error("error creating post", error);
      setResponse("error creating post");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="w-full flex flex-col gap-4 max-h-[400px] overflow-y-auto px-2">
      <h1>create a new post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          className="border p-2 rounded bg-black"
          disabled={isSubmitting}
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="body"
          className="border p-2 rounded bg-black"
          disabled={isSubmitting}
          required
        />
        <button
          type="submit"
          className="w-fit bg-slate-300 text-black p-2 rounded hover:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "create post"}
        </button>
        {response && (
          <div>
            <p>{response}</p>
          </div>
        )}
      </form>
    </main>
  );
}
