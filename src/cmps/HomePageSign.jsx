
export function HomePageSign() {
    const userName = "user"

    const userTxt = `welcome back ${userName}`
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