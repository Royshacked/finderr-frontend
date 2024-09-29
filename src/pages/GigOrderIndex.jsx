import { orderService } from "../services/order/index.js";
import { getCmdRemoveOrder, getCmdAddOrder, loadOrders, removeOrder, updateOrder, getCmdUpdateOrder } from "../store/actions/order.actions.js";

import { GigOrderList } from "../cmps/GigOrderList.jsx";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { SET_ORDER_FILTER_BY } from "../store/reducers/order.reducer.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { socketService } from "../services/socket.service.js";

export function GigOrderIndex({ isSeller }) {
    const orders = useSelector(state => state.orderModule.orders)
    const filterBy = useSelector(state => state.orderModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const status = orderService.getStatus()

    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on('add-order', order => {
            dispatch(getCmdAddOrder(order))
            showSuccessMsg(`${order.buyer.fullname} ordered from you`)
        })

        socketService.on('remove-order', orderId => {
            dispatch(getCmdRemoveOrder(orderId))
            showSuccessMsg(`order removed`)
        })

        socketService.on('update-order', order => {
            dispatch(getCmdUpdateOrder(order))
            showSuccessMsg(`order updated by ${order.seller.fullname}`)
        })
    }, [])

    useEffect(() => {
        dispatch({ type: SET_ORDER_FILTER_BY, filterBy: { ...filterBy, status: 'all', isSeller } })
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

    async function onChangeStatus(order, status) {
        try {
            await updateOrder({ ...order, status }, filterBy)
        } catch (error) {
            console.log(error)
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

        <GigOrderList orders={orders} filterBy={filterBy} isSeller={isSeller} onRemoveOrder={onRemoveOrder} onChangeStatus={onChangeStatus} />
    </section>
}