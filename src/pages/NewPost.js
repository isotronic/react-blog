import PostForm from "../components/PostForm";
import usePageTitle from "../utils/usePageTitle";

function NewPostPage() {
  usePageTitle("New Post");

  return <PostForm method="POST" />;
}

export default NewPostPage;
