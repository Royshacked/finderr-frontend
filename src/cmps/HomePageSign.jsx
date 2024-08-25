import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"




export function HomePageSign() {
    const navigate = useNavigate()
    const [userSearchTxt, setUserSearchTxt] = useState('')
    const userName = "user"


    function handleChange({ target }) {
        let { name, value } = target

        switch (target.type) {

            case 'search':
                value = value
                setUserSearchTxt(value)
                break

        }
    }
    async function onHandleSubmit(ev, values) {
        ev.preventDefault()
        try {
            navigate(`/search-gigs?query=${userSearchTxt}`)
        } catch (error) {
            console.log(error)

        }
    }
    const userTxt = `welcome back ${userName}`
    //?query=ss navigate('/toy')
    return (
        <section>


            <div className="user-bunner">
                {userTxt}
            </div>
            <div className="user-offers flex">
                <div className="user-offer add-info">
                    <h1>add-info</h1>
                </div>
                <div className="user-offer create-briff">
                    <h1>create-briff</h1>
                </div>
            </div>
        </section >

    )
}