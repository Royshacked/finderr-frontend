import { logout } from "../store/actions/user.actions"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function UserMenu({ isOpen }) {
    const [isMenuOpen, setIsMenuOpen] = useState(isOpen)
    const navigate = useNavigate()

    async function onHandleLogout(ev) {
        ev.preventDefault()
        try {
            await logout()
            showSuccessMsg('Logged out successfully')
            setIsMenuOpen(false)
            navigate('/')
        } catch (error) {
            showErrorMsg('Could\'nt loggout')
            console.log(error)
        }
    }

    if (!isMenuOpen) return

    return <section className="user-menu">
        <nav>
            <Link to="/profile">Profile</Link>
            <a href="" onClick={onHandleLogout}>Logout</a>
        </nav>
    </section>
}