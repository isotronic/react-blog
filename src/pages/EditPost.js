import { useLoaderData } from "react-router";
import PostForm from "../components/PostForm";
import HeaderSEO from "../components/HeaderSEO";

function EditPostPage() {
  const { post } = useLoaderData();

  return (
    <>
      <HeaderSEO title={`Edit: ${post.title}`} description="Edit your post." />
      <PostForm method="PATCH" post={post} />
    </>
  );
}

export default EditPostPage;
