import axios from "axios";
import UpdateForm from "@/components/update-form";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function Update({
  params,
}: {
  params: { postId: string };
}) {
  let post: Post | null = null;

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.postId}`,
    );
    post = response.data;
  } catch (error) {
    console.error(`error fetching post ${params.postId}`, error);
  }

  return (
    <main className="w-full flex flex-col gap-4 px-2">
      <h1>update post</h1>
      {post ? <UpdateForm post={post} /> : <p>Loading...</p>}{" "}
    </main>
  );
}
