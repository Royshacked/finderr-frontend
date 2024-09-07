import { GigFilter } from "./GigFilter.jsx"
import { Link, useNavigate } from "react-router-dom"
import { LoginSignup } from "./LoginSignup.jsx"
import Hire from '../assets/svg/homepage/hire.svg?react'
import FreeLancer from '../assets/svg/homepage/freelancer.svg?react'

import { useState } from "react"
import { useSelector } from "react-redux"

export function AppHeader() {
	const user = useSelector(state => state.userModule.user)
	const [isShowProMenu, setIsShowProMenu] = useState(null)
	//const [createUser, setCreateUser] = useState(false)
	const navigate = useNavigate()


	function onToggleProMenu() {
		setIsShowProMenu(!isShowProMenu)
	}

	return (
		<div className="app-header main-layout full">
			<header className="main-layout">
				<div>
					<div className="header-logo">
						<svg className="hamburger" xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19"><rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect><rect width="23" height="3" rx="1.5" fill="#555"></rect><rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect></svg>
						<svg width="89" height="27" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/')}><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg>
					</div>
					<GigFilter />
				</div>
				<nav className="header-nav flex">
					<button className="fiverpro-btn" onClick={onToggleProMenu}>
						Fiver pro
						<svg width="16" height="16" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"></path></svg>
						{isShowProMenu && <ul className="user-pro-menu-co flex">
							<li className="user-pro-option flex">
								<div className="user-pro-option-text flex">
									<a href="">i'm looking to hire</a>
									<p>My team needs vetted freelance talent and a premium business solution.</p>
								</div>
								<div className="user-pro-option-svg">
									<Hire />
								</div>
							</li>
							<li className="user-pro-option flex">
								<div className="user-pro-option-text flex">
									<a href="">i'm looking to hire</a>
									<p>My team needs vetted freelance talent and a premium business solution.</p>
								</div>
								<div className="user-pro-option-svg">
									<FreeLancer />
								</div>
							</li>
						</ul>}
					</button>

					<a href="/start_selling?source=top_nav" rel="nofollow">Become a Seller</a>
					<Link to="/order">Orders</Link>
					{!user && <a rel="nofollow" href="/login?source=top_nav">Sign in</a>}
					{!user && <a className="link-join" rel="nofollow" href="/join?source=top_nav">Join</a>}

					<div className="logged-in">
						<figure ><figcaption class="">R</figcaption></figure>
						<div></div>
					</div>
				</nav>
			</header >
			{/* <GigCategoriesBar /> */}
		</div>

	)
}
