import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import PostView from "../components/PostView";
import HeaderSEO from "../components/HeaderSEO";

function SinglePostPage() {
  const { post } = useLoaderData();

  return (
    <>
      <HeaderSEO title={post.title} description={post.content.slice(0, 150)} />
      <Suspense fallback="Loading...">
        <Await resolve={post}>{(loadedPost) => <PostView post={loadedPost} />}</Await>
      </Suspense>
    </>
  );
}

export default SinglePostPage;

async function loadPost(id) {
  const response = await fetch("http://localhost:4000/posts/" + id);

  if (!response.ok) {
    throw json({ message: "Could not load the post with id: " + id }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function postLoader({ params }) {
  return defer({
    post: await loadPost(params.postId),
  });
}
