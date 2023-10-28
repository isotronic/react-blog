import { useRouteLoaderData } from "react-router";
import PostForm from "../components/PostForm";

function EditPostPage() {
  const data = useRouteLoaderData("single-post");
  return <PostForm method="PATCH" post={data.post} />;
}

export default EditPostPage;
