import { orderService } from "../services/order/index.js";
import { loadOrders } from "../store/actions/order.actions.js";
import { OrderSeller } from "./OrdersSeller.jsx";
import { OrderBuyer } from "./OrderBuyer.jsx";

import { GigOrderList } from "../cmps/GigOrderList.jsx";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { SET_ORDER_FILTER_BY } from "../store/reducers/order.reducer.js";

export function GigOrderIndex() {
    const user = useSelector(state => state.userModule.user)
    const orders = useSelector(state => state.orderModule.orders)
    const filterBy = useSelector(state => state.orderModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const status = orderService.getStatus()

    const dispatch = useDispatch()

    useEffect(() => {
        loadGigOrders()
        setSearchParams(filterBy)
    }, [filterBy])

    async function loadGigOrders() {
        try {
            await loadOrders(filterBy)
        } catch (error) {
            console.log(error)
        }
    }

    function handleClick(status) {
        dispatch({ type: SET_ORDER_FILTER_BY, filterBy: { ...filterBy, status } })
    }

    return <section className="gig-orders main-layout">
        <header className="full">
            {user?.isSeller ? <h2>Dashboard</h2> : <h2>My orders</h2>}
            <nav>
                {status.map(stat => stat === filterBy.status ?
                    <b key={stat} className={`status ${stat}`} onClick={() => handleClick(stat)} style={{ color: 'black' }}>{stat.toUpperCase()} </b> :
                    <span key={stat} className={`status ${stat}`} onClick={() => handleClick(stat)}>{stat.toUpperCase()}</span>
                )}
            </nav>
        </header>

        <GigOrderList orders={orders} filterBy={filterBy} />
    </section>
}