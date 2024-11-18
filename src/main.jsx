import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ErrorPage from "./errorpage.jsx";
import Journalnav from "./components/journalnav.jsx";
import Journalscreen from "./components/journalscreen.jsx";
import Addjournal from "./components/addjournal.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Journalnav />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Journalscreen />, 
      },
      {
        path: "new-journal",
        element: <Addjournal />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);
