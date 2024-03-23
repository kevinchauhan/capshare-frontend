import { useAuthStore } from "@/store"
import { Navigate, Outlet } from "react-router-dom"

const Public = () => {
    const { user } = useAuthStore()
    if (user) {
        return <Navigate to={'/'} replace={true} />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Public