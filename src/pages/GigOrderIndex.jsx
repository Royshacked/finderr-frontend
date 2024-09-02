import { orderService } from "../services/order/order.service.local.js";
import { loadOrders } from "../store/actions/order.actions.js";

import { GigOrderList } from "../cmps/GigOrderList.jsx";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { SET_ORDER_FILTER_BY } from "../store/reducers/order.reducer.js";

export function GigOrderIndex() {
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

    return <section className="gig-orders main-layout ">
        <header>
            <h2>Manage Orders</h2>
            <nav>
                {status.map(stat =>
                    <span key={stat} onClick={() => handleClick(stat)}>{stat.toUpperCase()}</span>
                )}
            </nav>
        </header>

        <GigOrderList orders={orders} filterBy={filterBy} />
    </section>
}