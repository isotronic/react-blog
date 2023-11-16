import { useLoaderData } from "react-router";
import PostForm from "../components/PostForm";
import usePageTitle from "../utils/usePageTitle";

function EditPostPage() {
  const { post } = useLoaderData();
  usePageTitle(`Edit: ${post.title}`);

  return <PostForm method="PATCH" post={post} />;
}

export default EditPostPage;
