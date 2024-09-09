import { GigOrderList } from "../cmps/GigOrderList"
export function OrderBuyer(orders, filterby, user, handleClick, status) {
    console.log(orders.orders, orders.filterby, orders.user, orders.handleClick, orders.status)



    return <section className="gig-orders main-layout ">
        <header>
            <h2>your Orders</h2>
            <nav>
                {orders.status.map(stat =>
                    <span key={stat} className={stat} onClick={() => orders.handleClick(stat)}>{stat.toUpperCase()}</span>
                )}
            </nav>
        </header>

        <GigOrderList orders={orders.orders} filterBy={orders.filterby} />
    </section>





}



