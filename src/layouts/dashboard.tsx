import { useAuthStore } from "@/store"
import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "@/components/custom/sidebar"
import Header from "@/components/custom/header"

const Dashboard = () => {
    const { user } = useAuthStore()
    if (user === null) {
        return <Navigate to={'/auth/login'} replace={true} />
    }
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-auto">
                <Header />
                <div className="p-5 flex flex-col flex-1">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default Dashboard