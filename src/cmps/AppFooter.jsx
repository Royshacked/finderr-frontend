
import React from 'react'
import FacebookLogo from '../assets/svg/facebook-logo.svg?react'
import InstagramLogo from '../assets/svg/instagram-logo.svg?react'
import TwitterLogo from '../assets/svg/twitter-logo.svg?react'

export function AppFooter() {
	return (
		<section className='footer main-layout full'>
			<footer className="app-footer">
				{/* <div className="app-footer__top"> */}
				{/* *{ *<nav className="app-footer__nav">
			  <ul>
				<li><a href="/about-us">About Us</a></li>
				<li><a href="/services">Services</a></li>
				<li><a href="/contact">Contact</a></li>
				<li><a href="/faq">FAQ</a></li>
			  </ul>
			</nav> */}
				{/* </div> */}
				<div className="app-footer__bottom">
					<div className="brand">
						{/* <span className="app-footer__brand--name">finderr<span className="app-footer__brand--dot">.</span></span> */}
						<span className="logo" onClick={() => navigate('/')}>finderr<span className="dot"></span></span>
						<small>© 2024 Finderr. All rights reserved.</small>
					</div>

					<div className="socials">
						<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
							<InstagramLogo />
						</a>

						<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
							<FacebookLogo />
						</a>

						<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
							<TwitterLogo />
						</a>
					</div>
				</div>
			</footer>
		</section>
	)
}