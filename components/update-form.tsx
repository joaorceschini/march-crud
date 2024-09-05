"use client";

import React, { useState } from "react";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  body: string;
};

type UpdateFormProps = {
  post: Post;
};

export default function UpdateForm({ post }: UpdateFormProps) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {
          title,
          body,
        },
      );
      setResponse(
        `post updated successfully: ${JSON.stringify(response.data)}`,
      );
    } catch (error) {
      console.error("error updating post", error);
      setResponse("error updating post");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
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
        {isSubmitting ? "submitting..." : "update post"}
      </button>
      {response && (
        <div>
          <p>{response}</p>
        </div>
      )}
    </form>
  );
}
