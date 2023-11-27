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
import AdminPage, { adminPostsLoader } from "./pages/Admin";
import { HelmetProvider } from "react-helmet-async";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";

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

          {
            path: ":postId",
            loader: postLoader,
            element: <SinglePostPage />,
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
      {
        path: "/admin",
        id: "admin",
        loader: checkAuthLoader,
        children: [
          { index: true, element: <AdminPage />, loader: adminPostsLoader },
          { path: "new", element: <NewPostPage /> },
          { path: ":postId/edit", element: <EditPostPage />, loader: postLoader },
        ],
      },
      { path: "/logout", action: logoutAction },
      {
        path: "/password",
        children: [
          { path: "forgot", element: <ForgotPasswordPage /> },
          { path: "reset", element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
