"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
};

type PostsListProps = {
  posts: Post[];
};

export default function PostsList({ posts: initialPosts }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(postId: number) {
    setDeletingId(postId);
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      );
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(`error deleting post ${postId}`, error);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full pb-2 border-b border-neutral-800 flex flex-col gap-8 items-start justify-between md:flex-row md:items-center"
        >
          <div>
            <h2 className="text-base">{post.title}</h2>
            <p className="text-gray-400">{post.body}</p>
          </div>
          <div className="flex gap-8">
            <Link href={`/${post.id}/update`} className="hover:opacity-70">
              update
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              disabled={deletingId === post.id}
            >
              {deletingId === post.id ? (
                <span className="opacity-70">deleting...</span>
              ) : (
                <span className="hover:opacity-70">delete</span>
              )}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
