import { GigFilter } from "./GigFilter.jsx"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function AppHeader() {






	const navigate = useNavigate()
	const [userSearchTxt, setUserSearchTxt] = useState('')


	function handleChange({ target }) {
		let { name, value } = target

		switch (target.type) {

			case 'search':
				value = value
				setUserSearchTxt(value)
				break

		}
	}
	async function onHandleSubmit(ev, values = false) {
		var userFilterNavigate = ''
		values ? userFilterNavigate = values : userFilterNavigate = userSearchTxt
		ev.preventDefault()
		console.log(userFilterNavigate)
		try {
			navigate(`/search-gigs?query=${userFilterNavigate}`)
		} catch (error) {
			console.log(error)

		}
	}

	return (
		<header className="app-header full">
			<nav>
				<div className="header-row flex">
					<svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/')}><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg>

					<div className="search-form-header flex">
						<GigFilter />
					</div>



					<ul className="fiverr-nav flex">
						<li className="nav-list-item nav-li-fiverpro">
							<span>Fiver pro</span>
						</li>
						<li className="nav-list-item nav-li-explore ">
							<span>explore</span>
						</li>
						<li className="nav-list-item nav-li-language">
							<span>english</span>
						</li>
						<li className="nav-list-item nav-li-seller-switch">
							<a href="/start_selling?source=top_nav" className="nav-link" rel="nofollow">Become a Seller</a>
						</li>

						<li className="nav-list-item nav-li-sign-in">
							{/* onClick={setCreateUser(true)} */}
						</li>

						<li className="nav-list-item nav-li-join">
							<a className="href fiverr-header-join" rel="nofollow" href="/join?source=top_nav">Join</a>
						</li>
					</ul>
				</div>
				{/* <ul className="categories"></ul> */}

			</nav>
			<div className="categories-bar">
				<div className="categories-bar-box flex" onClick={(ev) => onHandleSubmit(ev, 'programming_tech')}>
					<span className="categories-bar-span">
						programming_tech
					</span>
				</div>
				<div className="categories-bar-box flex">
					<span className="categories-bar-span">
						programming_tech
					</span>
				</div>
				<div className="categories-bar-box flex">
					<span className="categories-bar-span">
						programming_tech
					</span>
				</div>
				{/* {createUser && <div className="cover-screen" onClick={() => closeModal()}> */}
				{/* </div>} */}

			</div>

		</header >

	)
}

{/* <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19"><rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect><rect width="23" height="3" rx="1.5" fill="#555"></rect><rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect></svg>
			<rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect>
			<rect width="23" height="3" rx="1.5" fill="#555"></rect>
			<rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect>
		 */}