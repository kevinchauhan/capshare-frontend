import { DashboardIcon } from "@radix-ui/react-icons"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen border-r flex flex-col p-4">
            <div className="logo text-xl font-bold text-center mb-5">
                <h1>CapShare</h1>
            </div>
            <div className="mt-10">
                <ul className="menu flex flex-col pl-3 gap-3 font-medium">
                    <li><NavLink to='/' className="flex items-center gap-2 hover:bg-primary hover:text-white ease-in px-2 py-2 rounded-lg" ><DashboardIcon /> <span> Dashboard</span></NavLink></li>
                    <li><NavLink to='/customers' className="flex items-center gap-2 hover:bg-primary hover:text-white ease-in px-2 py-2 rounded-lg" > <i className="fa-solid fa-users"></i><span> Customers</span></NavLink></li>
                    <li><NavLink to='/events' className="flex items-center gap-2 hover:bg-primary hover:text-white ease-in px-2 py-2 rounded-lg" ><i className="fa-regular fa-calendar-check"></i> <span> Events</span></NavLink></li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar