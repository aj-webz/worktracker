import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "../components/ui/navigation-menu"
import { Link } from "@tanstack/react-router"
export default function Navbar() {
    return (
        <nav className="w-full flex bg-black justify-between p-4">
            <div className="logo text-blue-300 font-bold text-2xl">
                WORKTRACKER
            </div>
            <NavigationMenu className="flex space-x-5">
                <NavigationMenuList>
                    <NavigationMenuItem className="px-4 py-2 text-sm font-medium text-white hover:underline">
                        <Link to="/">Home</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="px-4 py-2 text-sm font-medium text-white hover:underline">
                        <Link to="/dashboards">DashBoard</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    )
}