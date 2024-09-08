import { GigOrderList } from "../cmps/GigOrderList"
import { updateOrder } from "../store/actions/order.actions"
import { useNavigate } from "react-router"
export function OrderSeller(orders, filterby, user, handleClick, status) {
    console.log(orders.orders, orders.filterby, orders.user, orders.handleClick, orders.status)
    const navigate = useNavigate()

    function changeStatus(order, status) {
        order.status = status
        var newOrder = updateOrder(order)
        console.log(newOrder);

        navigate("/api/order")
    }
    return <section className="gig-orders main-layout ">
        <header>
            <h2>Manage Orders</h2>
            <nav>
                {orders.status.map(stat =>
                    <span key={stat} className={stat} onClick={() => orders.handleClick(stat)}>{stat.toUpperCase()}</span>
                )}
            </nav>
        </header>

        <GigOrderList orders={orders.orders} filterBy={orders.filterby} changeStatus={changeStatus} />
    </section>





}



