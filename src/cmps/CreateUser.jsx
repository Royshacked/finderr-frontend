
import { useState } from "react"
import { useNavigate } from "react-router"
export function CreateUser() {
    //const [user, setUser] = useState(userService.getEmptyUser())
    // const [isUserDisplay, setUserDisplay] = useState(false)
    const navigate = useNavigate()

    // const { NavLink } = ReactRouterDOM

    // useEffect(() => {
    //     userService.get(params.userId)
    //         .then(user => setUser(user))
    // }, [])

    // function handleChange({ target }) {
    //     const { type, name: prop } = target

    //     let { value } = target
    //     console.log(type, prop, user.imgUrl, value);
    //     value = value

    //     setUser(prevUser => ({ ...prevUser, [prop]: value }))
    //     console.log(user, user.imgUrl);
    // }


    // function onAddUser(ev) {
    //     ev.preventDefault()

    //     console.log(ev, user);
    //     saveUser(ev, user)
    //     console.log('user:', user)
    //     toggleUser()
    // }
    // function closeModal() {
    //     setUserDisplay(false)
    // }
    return (
        <section>
            {/* {isUserDisplay && <div className="cover-screen" onClick={() => closeModal()}> */}
            {/* <div className="update-modal">
                <h1>Edit</h1>

            </div>
        </div>} */}
        </section >
    )
}


// {txt.length > 4 && <button onClick={toggleRead}>{(isReadMore) ? 'Read less' : 'Read More'}</button>}


