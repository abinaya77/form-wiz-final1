import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import Endfoot from "../components/footers/Endfoot"




const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
        <NavBar/>
        <Outlet/>
        <Endfoot/>
    </main>
  )
}

export default MainLayout
