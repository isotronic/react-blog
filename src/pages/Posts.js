import { Suspense } from "react";
import PostList from "../components/PostList";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import usePageTitle from "../utils/usePageTitle";

function PostsPage() {
  const { posts } = useLoaderData();
  usePageTitle("All Posts");

  return (
    <Suspense fallback="Loading...">
      <Await
        resolve={posts}
        errorElement={<p style={{ textAlign: "center" }}>There are no posts.</p>}
      >
        {(loadedPosts) => <PostList posts={loadedPosts} />}
      </Await>
    </Suspense>
  );
}

export default PostsPage;

async function loadPosts() {
  const response = await fetch("http://localhost:4000/posts");

  if (!response.ok) {
    throw json({ message: "Could not load posts." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

export function postsLoader() {
  return defer({
    posts: loadPosts(),
  });
}
