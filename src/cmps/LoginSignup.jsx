import { useEffect, useState } from "react"
import { userService } from '../services/user/user.service.local'
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
        console.log(user);

    }
    function onSaveUser() {

        userService.signup(user)
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

                <input value={user.fullname} onChange={handleChange} type="text" id="fullname" name="fullname" placeholder="fullname" />

                <input value={user.imgUrl} onChange={handleChange} type="text" id="imgUrl" name="imgUrl" placeholder="imgUrl" />

                <input value={user.username} onChange={handleChange} type="text" id="username" name="username" placeholder="username" />

                <input value={user.imgUrl} onChange={handleChange} type="text" id="imgUrl" name="imgUrl" placeholder="imgUrl" />

                {/* <input value={user.level} onChange={handleChange} type="text" id="imgUrl" name="imgUrl" placeholder="imgUrl" /> */}



                {/* <textarea value={addMail.body} onChange={handleChange} rows={15} cols={50} maxLength={200} name="body" id="body"></textarea> */}
                <button>Send</button>
            </form>
        </div>
    )
}