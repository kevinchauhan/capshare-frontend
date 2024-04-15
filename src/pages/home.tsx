import Header from "@/components/custom/header"
import { useAuthStore } from "@/store"
import { Navigate } from "react-router-dom"

const Home = () => {
    const { user } = useAuthStore()
    if (user) {
        return <Navigate to={'/app'} replace={true} />
    }
    return (
        <>
            <Header />
            <div>Home</div>
        </>
    )
}

export default Home