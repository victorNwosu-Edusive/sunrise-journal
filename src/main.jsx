import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App.jsx';
import ErrorPage from "./errorpage.jsx";
import Journalnav from "./components/journalnav.jsx";
import Journalscreen from "./components/journalscreen.jsx";
import Addjournal from "./components/addjournal.jsx";
import Journalsave from "./components/savedJournal.jsx";
import Loading from "./components/loading"; // Import the Loading component
import ArchivedJournals from "./components/archivedJournal.jsx";

// Define the router and routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Journalscreen />, // Homepage, no Journalnav
    errorElement: <ErrorPage />,
  },
  {
    path: "/", // Routes that include Journalnav
    element: <Journalnav />, 
    errorElement: <ErrorPage />,
    children: [
      {
        path: "new-journal",
        element: <Addjournal />,
      },
      {
        path: "saved-journal",
        element: <Journalsave />,
      },
      {
        path: "archived-journal",
        element: <ArchivedJournals />,
      },
    ],
  },
]);

function Root() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust time as needed
  }, []);

  return (
    <React.StrictMode>
      {isLoading ? (
        <Loading /> // Show loading screen while isLoading is true
      ) : (
        <RouterProvider router={router} />
      )}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
