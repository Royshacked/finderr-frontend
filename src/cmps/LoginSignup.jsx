import { useEffect, useState } from "react";
import { userService } from '../services/user/user.service.local';
import { SignInSection } from "./SignInSection";

export function LoginSignup() {
    const [user, setUser] = useState(userService.getEmptyUser());

    function handleChange({ target }) {
        const { type, name: prop } = target;
        let { value } = target;
        setUser(prevUser => ({ ...prevUser, [prop]: value }));
    }
    
    function onSaveUser(event) {
        event.preventDefault();
        userService.signup(user);
    }

    return (
        <div className="login-page">
            <form className='user-form' onSubmit={onSaveUser}>
                <img 
                    className="login-banner" 
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/identification_perseus/standard.0638957.png" 
                    alt="setup illustration banner"
                />
                <SignInSection />
            </form>
        </div>
    );
}
