import { useEffect, useState } from "react"

import { userService } from '../services/user/user.service.local'

import { login, signup } from "../store/actions/user.actions"

export function LoginSignup() {
    const [user, setUser] = useState(userService.getEmptyUser)
    console.log(user)

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

    function onSaveUser(ev) {
        ev.preventDefault()
        user.type = 'buyer'
        //  user._id = '12345'
        console.log(user);


        signup(user)
    }

    {/* const users = [
// 	{ */}
    // 		_id: 'u101',
    // 		fullname: 'User 1',
    // 		imgUrl: '/img/img1.jpg',
    // 		username: 'user1',
    // 		password: 'secret',
    // 		level: 'basic/premium',
    {/* // 	} */ }

    return (
        <div className="login-page">


            Login/Signup
            <form className='user-form' onSubmit={onSaveUser} >

                <input value={user.fullname} onChange={handleChange} type="text" id="fullname" name="fullname" placeholder="fullname" required />

                <input value={user.imgUrl} onChange={handleChange} type="text" id="imgUrl" name="imgUrl" placeholder="imgUrl" />

                <input value={user.username} onChange={handleChange} type="text" id="username" name="username" placeholder="username" required />


                <input value={user.password} onChange={handleChange} type="text" id="password" name="password" placeholder="password" required />


                {/* <input value={user.level} onChange={handleChange} type="text" id="imgUrl" name="imgUrl" placeholder="imgUrl" /> */}



                {/* <textarea value={addMail.body} onChange={handleChange} rows={15} cols={50} maxLength={200} name="body" id="body"></textarea> */}
                <button>Send</button>
            </form>
        </div>
    )
}