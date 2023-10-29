import { useRouteLoaderData } from "react-router";
import PostForm from "../components/PostForm";
import usePageTitle from "../utils/usePageTitle";

function EditPostPage() {
  const { post } = useRouteLoaderData("single-post");
  usePageTitle(`Edit: ${post.title}`);

  return <PostForm method="PATCH" post={post} />;
}

export default EditPostPage;
