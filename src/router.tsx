import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./layouts/dashboard";
import Public from "./layouts/public";
import Root from "./layouts/root";
import Customer from "./pages/customer";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Dashboard />,
                children: [
                    {
                        path: '',
                        element: <Home />
                    },
                    {
                        path: 'customer',
                        element: <Customer />
                    },
                ]
            },
            {
                path: '/auth',
                element: <Public />,
                children: [
                    {
                        path: 'signup',
                        element: <Signup />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    }
                ]
            }
        ]
    }


])