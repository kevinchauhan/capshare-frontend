import { useAuthStore } from "@/store"
import { Link, Navigate, Outlet } from "react-router-dom"

const Dashboard = () => {
    const { user } = useAuthStore()
    if (user === null) {
        return <Navigate to={'/auth/login'} replace={true} />
    }
    return (
        <div>
            <Link to='/auth/login'>Login</Link>
            <Outlet />
        </div>
    )
}

export default Dashboard