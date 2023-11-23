import PostForm from "../components/PostForm";
import HeaderSEO from "../components/HeaderSEO";

function NewPostPage() {
  return (
    <>
      <HeaderSEO title="New Post" description="Create a new post." />
      <PostForm method="POST" />
    </>
  );
}

export default NewPostPage;
