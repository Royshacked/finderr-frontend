import { Link } from "react-router-dom"

export function UserMenu({ isOpen, onHandleLogout }) {
    if (!isOpen) return

    return <section className="user-menu">
        <nav>
            <Link to="/profile">Profile</Link>
            <a href="" onClick={onHandleLogout}>Logout</a>
        </nav>
    </section>
}