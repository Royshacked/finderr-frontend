import { orderService } from "../services/order/index.js";
import { loadOrders, removeOrder } from "../store/actions/order.actions.js";
import { OrderSeller } from "./OrdersSeller.jsx";
import { OrderBuyer } from "./OrderBuyer.jsx";

import { GigOrderList } from "../cmps/GigOrderList.jsx";

import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import { SET_ORDER_FILTER_BY } from "../store/reducers/order.reducer.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function GigOrderIndex({ isSeller }) {
    const user = useSelector(state => state.userModule.user)
    const orders = useSelector(state => state.orderModule.orders)
    const filterBy = useSelector(state => state.orderModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const status = orderService.getStatus()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: SET_ORDER_FILTER_BY, filterBy: { ...filterBy, isSeller } })
    }, [isSeller])

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

    async function onRemoveOrder(orderId) {
        try {
            await removeOrder(orderId)
            showSuccessMsg('Order removed')
        } catch (error) {
            console.log(error)
            showErrorMsg('Could\'nt remove order')
        }
    }

    return <section className="gig-orders main-layout">
        <header className="">
            {isSeller ? <h2>Dashboard</h2> : <h2>My orders</h2>}
            <nav>
                {status.map(stat => stat === filterBy.status ?
                    <b key={stat} className={`status ${stat}`} onClick={() => handleClick(stat)} style={{ color: 'black' }}>{stat.toUpperCase()} </b> :
                    <span key={stat} className={`status ${stat}`} onClick={() => handleClick(stat)}>{stat.toUpperCase()}</span>
                )}
            </nav>
        </header>

        <GigOrderList orders={orders} filterBy={filterBy} isSeller={isSeller} onRemoveOrder={onRemoveOrder} />
    </section>
}