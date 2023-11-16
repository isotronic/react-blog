import { Suspense } from "react";
import PostList from "../components/PostList";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import usePageTitle from "../utils/usePageTitle";

function AdminPage() {
  const { posts } = useLoaderData();
  usePageTitle("Admin");

  return (
    <Suspense fallback="Loading...">
      <Await
        resolve={posts}
        errorElement={<p style={{ textAlign: "center" }}>You have no posts.</p>}
      >
        {(loadedPosts) => <PostList posts={loadedPosts} admin={true} />}
      </Await>
    </Suspense>
  );
}

export default AdminPage;

async function loadPostsFromAuthor(userId) {
  const response = await fetch("http://localhost:4000/posts/author/" + userId);

  if (!response.ok) {
    throw json({ message: "Could not load posts." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

export function adminPostsLoader() {
  const userId = localStorage.getItem("userId");
  return defer({
    posts: loadPostsFromAuthor(userId),
  });
}
