import { createBrowserRouter } from "react-router-dom";

import ROUTE_PATH from "./constants";
import Calendar from "../pages/Calendar/index";
import Layout from "../components/Layout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: ROUTE_PATH.ROOT,
    children: [
      {
        element: <Home />,
        path: ROUTE_PATH.HOME,
      },
      {
        element: <Calendar />,
        path: ROUTE_PATH.CALENDAR,
      },
    ],
  },
]);

export default router;
