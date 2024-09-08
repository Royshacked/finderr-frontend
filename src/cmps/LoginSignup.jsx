import { userService } from '../services/user/index.js'
import { login, signup } from "../store/actions/user.actions.js"

import { useState } from "react"
import { useNavigate } from "react-router"


export function LoginSignup({ isLogin }) {
    const [user, setUser] = useState(userService.getEmptyUser)
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { type, name: prop } = target

        let { value } = target
        switch (type) {
            case 'text':

                value = value
                break;
        }
        setUser(prevUser => ({ ...prevUser, [prop]: value }))
    }

    async function onSaveUser(ev) {
        ev.preventDefault()

        const method = isLogin ? login : signup
        try {
            await method(user)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-page">
            {isLogin ? 'Login' : 'Signup'}
            <form className='user-form' onSubmit={onSaveUser} >
                {!isLogin && <label htmlFor="fullname">
                    <input value={user.fullname || ''} onChange={handleChange} type="text" id="fullname" name="fullname" placeholder="fullname" required />
                </label>}
                {!isLogin && <label htmlFor="imgUrl">
                    <input value={user.imgUrl || ''} onChange={handleChange} type="text" id="imgUrl" name="imgUrl" placeholder="imgUrl" />
                </label>}
                <label htmlFor="username">
                    <input value={user.username || ''} onChange={handleChange} type="text" id="username" name="username" placeholder="username" required />
                </label>
                <label htmlFor="password">
                    <input value={user.password || ''} onChange={handleChange} type="password" id="password" name="password" placeholder="password" required />
                </label>
                {/* <input value={user.level} onChange={handleChange} type="text" id="imgUrl" name="imgUrl" placeholder="imgUrl" /> */}
                {/* <textarea value={addMail.body} onChange={handleChange} rows={15} cols={50} maxLength={200} name="body" id="body"></textarea> */}
                <button>Send</button>
            </form>
        </div>
    )
}