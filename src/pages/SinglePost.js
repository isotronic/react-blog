import { Suspense } from "react";
import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import PostView from "../components/PostView";
import usePageTitle from "../utils/usePageTitle";

function SinglePostPage() {
  const { post } = useRouteLoaderData("single-post");
  usePageTitle(post.title);

  return (
    <Suspense fallback="Loading...">
      <Await resolve={post}>{(loadedPost) => <PostView post={loadedPost} />}</Await>
    </Suspense>
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

export async function deletePostAction({ request, params }) {
  const response = await fetch("http://localhost:4000/delete/" + params.postId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete the post with id: " + params.postId }, { status: 500 });
  }

  return redirect("/posts");
}
