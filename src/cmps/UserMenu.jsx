import { Link } from "react-router-dom"
import { logout } from "../store/actions/user.actions"


export function UserMenu({ isOpen }) {
    async function onHandleLogout() {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    if (!isOpen) return

    return <section className="user-menu">
        <nav>
            <Link to="/profile">Profile</Link>
            <a href="" onClick={onHandleLogout}>Logout</a>
        </nav>
    </section>
}