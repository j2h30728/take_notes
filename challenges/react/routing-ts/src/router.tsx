import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { About, AuthorDetail, BookCharacters, BookDetail, Home, BookChapters } from "./pages";
import ErrorComponent from "./components/ErrorComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "author/:name",
        element: <AuthorDetail />,
        children: [
          {
            path: ":book",
            element: <BookDetail />,
            children: [
              { path: "chapters", element: <BookChapters /> },
              { path: "characters", element: <BookCharacters /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
