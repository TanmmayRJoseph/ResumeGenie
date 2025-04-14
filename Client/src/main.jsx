import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContext from "./contexts/userContext.jsx";
import SignupPage from "./pages/signup.jsx";
import LoginPage from "./pages/login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContext>
      <div className="bg-slate-900 min-h-screen w-full shadow-lg">
        <RouterProvider router={router} />
      </div>
    </UserContext>
  </StrictMode>
);
