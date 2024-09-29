
import React from 'react'
import FacebookLogo from '../assets/svg/facebook-logo.svg?react'
import InstagramLogo from '../assets/svg/instagram-logo.svg?react'
import TwitterLogo from '../assets/svg/twitter-logo.svg?react'

export function AppFooter() {
	return (
		<section className='footer main-layout full'>
			<footer className="app-footer">
				<div className="app-footer__bottom">
					<div className="brand">
						<span className="logo">finderr<span className="dot"></span></span>
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