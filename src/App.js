import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import PostsPage, { postsLoader } from "./pages/Posts";
import PostsRootLayout from "./pages/PostsRoot";
import SinglePostPage, { postLoader } from "./pages/SinglePost";
import EditPostPage from "./pages/EditPost";
import NewPostPage from "./pages/NewPost";
import AuthPage from "./pages/Auth";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import { logoutAction } from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/posts",
        element: <PostsRootLayout />,
        children: [
          { index: true, element: <PostsPage />, loader: postsLoader },
          { path: "/posts/new", element: <NewPostPage />, loader: checkAuthLoader },
          {
            path: ":postId",
            id: "single-post",
            loader: postLoader,
            children: [
              {
                index: true,
                element: <SinglePostPage />,
              },
              { path: "edit", element: <EditPostPage />, loader: checkAuthLoader },
            ],
          },
        ],
      },
      {
        path: "/auth",
        children: [
          { path: "login", element: <AuthPage mode="login" /> },
          { path: "register", element: <AuthPage mode="register" /> },
        ],
      },
      { path: "/logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
