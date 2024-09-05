import axios from "axios";
import PostsList from "@/components/posts-list";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function Home() {
  let posts: Post[] = [];

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    posts = response.data;
  } catch (error) {
    console.error("error fetching posts", error);
  }

  return (
    <main className="w-full flex flex-col gap-4 max-h-[400px] overflow-y-auto px-2">
      <PostsList posts={posts} />
    </main>
  );
}
