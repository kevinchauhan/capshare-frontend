import Header from "@/components/custom/header"
import { useAuthStore } from "@/store"
import { Navigate } from "react-router-dom"

const Home = () => {
    const { user } = useAuthStore()
    if (user) {
        return <Navigate to={'/app/dashboard'} replace={true} />
    }
    return (
        <>
            <Header />
            <div className="">
                <p>This is and photo seletion app between</p>
            </div>
        </>
    )
}

export default Home