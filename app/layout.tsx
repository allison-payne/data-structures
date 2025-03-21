import { Outlet } from "react-router"


const Layout = () => {
    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <Outlet />
        </main>
    )
}

export default Layout