import { Outlet } from "react-router";

function PostsRootLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default PostsRootLayout;
