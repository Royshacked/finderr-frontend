
import { userService } from '../services/user/user.service.local'
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { useState } from 'react'
import { useNavigate } from 'react-router'

//import { userService } from '../services/user/index.js'
//import { login, signup } from "../store/

import { login, signup } from "../store/actions/user.actions"

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
        user.type = 'buyer'
        //  user._id = '12345'
        console.log(user);


        signup(user)
    }


    const method = isLogin ? login : signup
    // try {
    //     await method(user)
    //     navigate('/api')
    // } catch (error) {
    //     console.log(error)
    // }


    return <div className="login-page">


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
}