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

    const orders = useSelector(state => state.orderModule.orders)
    const filterby = useSelector(state => state.orderModule.filterBy)
    const user = useSelector(state => state.userModule.user)
    const [searchParams, setSearchParams] = useSearchParams()
    console.log(user);

    const status = orderService.getStatus()

    console.log(status)

    const dispatch = useDispatch()
    console.log(orders);
    useEffect(() => {
        loadGigOrders()


        setSearchParams(filterby)
    }, [filterby])

    async function loadGigOrders() {
        try {
            await loadOrders(filterby)
        } catch (error) {
            console.log(error)
        }
    }

    function handleClick(status) {
        if (status === 'all') status = null
        dispatch({ type: SET_ORDER_FILTER_BY, filterBy: { ...filterby, status } })
    }
    return <>
        {user && user.type === 'seller' && <OrderSeller orders={orders} filterby={filterby} user={user} handleClick={handleClick} status={status} />}
        {user && <OrderBuyer orders={orders} filterby={filterby} user={user} handleClick={handleClick} status={status} />}
        {user && user.type === 'buyer' && <OrderBuyer orders={orders} filterby={filterby} user={user} handleClick={handleClick} status={status} />}

    </>
    //
}