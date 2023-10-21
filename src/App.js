import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import PostsPage from "./pages/Posts";
import PostsRootLayout from "./pages/PostsRoot";
import SinglePostPage from "./pages/SinglePost";
import EditPostPage from "./pages/EditPost";
import NewPostPage from "./pages/NewPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "posts",
        element: <PostsRootLayout />,
        children: [
          { index: true, element: <PostsPage /> },
          { path: "new", element: <NewPostPage /> },
          {
            path: ":postId",
            children: [
              { index: true, element: <SinglePostPage /> },
              { path: "edit", element: <EditPostPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
