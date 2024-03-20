import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Login from "./pages/login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/login',
        element: <Login />
    },
])