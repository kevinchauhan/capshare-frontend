import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./layouts/dashboard";
import Public from "./layouts/public";
import Root from "./layouts/root";
import Customer from "./pages/customer";
import Events from "./pages/events";
import File from "./pages/file";

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
                        path: 'customers',
                        element: <Customer />
                    },
                    {
                        path: 'events',
                        element: <Events />
                    },
                    {
                        path: 'events/:id',
                        element: <File />
                    }
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