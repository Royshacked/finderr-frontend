// SignInSection.jsx
import React from 'react'
import GoogleLogo from '../assets/svg/LoginSignUp/google-logo.svg?react'
import AppleLogo from '../assets/svg/LoginSignUp/apple-logo.svg?react'
import FacebookLogo from '../assets/svg/LoginSignUp/facebook-logo.svg?react'
import EmailLogo from '../assets/svg/LoginSignUp/email-logo.svg?react'

export function SignInSection() {
  return (
    <section className="sign-in-form">

      <section className="title">
        <h4>Sign in to your account</h4>
        <p className="sign-in-subtitle">
          <span>Don’t have an account? 
            <span role="button" className="jYWgWbM">Join here</span>
          </span>
        </p>
      </section>

      <button className="icon-button google-signing-button">
        <GoogleLogo width="20" height="20" />
        <p>Continue with Google</p>
      </button>

      <button className="icon-button email-signing-button">
        <EmailLogo width="20" height="20" />
        <p>Continue with email/username</p>
      </button>

      <strong className="flex flex-center">OR</strong>

      <section className="flex flex-between">
        <button className="icon-button apple-signing-button">
          <AppleLogo width="20" height="20" />
          <p>Apple</p>
        </button>

        <button className="icon-button facebook-signing-button">
          <FacebookLogo width="20" height="20" />
          <p>Facebook</p>
        </button>
      </section>
    </section>
  );
}
