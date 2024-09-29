import { GigFilter } from "./GigFilter.jsx"
import { LoginSignup } from "./LoginSignup.jsx"
import { UserMenu } from "./UserMenu.jsx"

import Hire from '../assets/svg/homepage/hire.svg?react'
import FreeLancer from '../assets/svg/homepage/freelancer.svg?react'

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { logout } from "../store/actions/user.actions.js"

export function AppHeader() {
	const user = useSelector(state => state.userModule.user)

	const [isShowProMenu, setIsShowProMenu] = useState(null)
	const [isPopUserMenu, setIsPopUserMenu] = useState(false)

	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
	const [isSignup, setIsSignup] = useState(false)
	const [isSideShow, setIsSideShow] = useState(false)

	function onToggleSideBar() {
		setIsSideShow(!isSideShow)
	}

	const navigate = useNavigate()

	function onToggleUserMenu() {
		setIsPopUserMenu(!isPopUserMenu)
	}

	function openModal(ev, isSignupMode) {
		ev.preventDefault()
		setIsSignup(isSignupMode) // Correctly set the signup mode
		setIsLoginModalOpen(true) // Open the modal
	}

	function closeModal() {
		setIsLoginModalOpen(false) // Close the modal
	}

	function toggleSignup() {
		setIsSignup(prev => !prev)
	}

	async function onHandleLogout(ev) {
		ev.preventDefault()
		try {
			await logout()
			showSuccessMsg('Logged out successfully')
			setIsPopUserMenu(false)
			navigate('/')
		} catch (error) {
			showErrorMsg('Could\'nt loggout')
			console.log(error)
		}
	}

	return (
		<>
			<div className={isSideShow ? "sidebar-overlay menu-shown" : "sidebar-overlay"} onClick={() => onToggleSideBar()}>
				<div className={isSideShow ? "site-sidebar menu-shown" : "site-sidebar"}>
					<div className="sidebar-header">
						{!user && <a className="join-fiver-button" onClick={(ev) => openModal(ev, true)}>Join Fiverr</a>}
					</div>
					<div className="side-bar-menu">
						<Link to="/" className="sidebar-item">Home</Link>

						{user?.isSeller && <Link to="/dashboard" className="sidebar-item">Dashboard</Link>}
						{user && <Link to="/order" className="sidebar-item">My orders</Link>}

						{!user && <a className="sidebar-item" href="" onClick={(ev) => openModal(ev, false)}>Sign in</a>}
						{user && <a className="sidebar-item" href="" onClick={onHandleLogout}>Logout</a>}
					</div>
				</div>
			</div>
			<div className="app-header main-layout full">
				<header className="main-layout">
					<div className="logo-filter">
						<div className="header-logo">
							<svg className="hamburger" xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" onClick={() => onToggleSideBar()}><rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect><rect width="23" height="3" rx="1.5" fill="#555"></rect><rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect></svg>
							<span className="logo" onClick={() => navigate('/')}>finderr<span className="dot"></span></span>
						</div>
						<GigFilter />
					</div>
					<nav className="header-nav flex">

						{user?.isSeller && <Link to="/dashboard">Dashboard</Link>}
						{user && <Link to="/order">My orders</Link>}
						{!user && <button onClick={(ev) => openModal(ev, false)}>Sign in</button>}
						{!user && <button className="link-join" onClick={(ev) => openModal(ev, true)}>Join</button>}

						{user && <div className="logged-in" onClick={onToggleUserMenu}>
							<figure ><figcaption >{user.fullname.charAt(0).toUpperCase()}</figcaption></figure>
							<div></div>
						</div>}
					</nav>
				</header >
				{isPopUserMenu && <UserMenu isOpen={isPopUserMenu} onHandleLogout={onHandleLogout} />}
				{isPopUserMenu && <div className="back-drop" onClick={onToggleUserMenu}></div>}

				{isLoginModalOpen && (
					<LoginSignup
						isSignup={isSignup}
						onClose={closeModal}
						onToggleSignup={toggleSignup}
					/>
				)}
			</div>
		</>
	)
}
