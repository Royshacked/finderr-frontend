
import { updateOrder } from "../store/actions/order.actions"
import { loadOrders } from "../store/actions/order.actions"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { gigService } from "../services/gig/gig.service.local"
import { SET_ORDER_FILTER_BY } from "../store/reducers/order.reducer.js";


export function GigOrderPreview({ order, changeStatus, filterBy }) {
    console.log(order);

    //const navigate = useNavigate()
    const filterByToEdit = gigService.getDefaultFilter()
    const user = useSelector(state => state.userModule.user)

    const dispatch = useDispatch()
    // const navigate = useNavigate()
    console.log('rundar');

    function buttonSwitch(type) {

        switch (type) {
            case 'pending':
                return <> <span className={`button button-aprove`} onClick={ev => (changeSttatus(ev, order, 'aprove'))}>aprove</span>
                    <span className={`button button-rejected`} onClick={ev => (changeSttatus(ev, order, 'rejected'))}>rejected</span></>

                break;
            case 'aprove':

                return <> <span className={`button button-aprove`} onClick={ev => (changeSttatus(ev, order, 'completed'))}>completed</span></>





            default:
                break;
        }
    }

    function changeSttatus(ev, order, sta) {
        // ev.preventDefault()
        console.log(order);
        console.log(filterBy);



        order.status = sta

        // console.log(order)

        const update = updateOrder(order, filterBy)
        const filtr = loadOrders(filterBy)

        // navigate("/order")
    }
    // var status = order.status.charAt(0).toUpperCase() + order.status.slice(1)
    return <article className="gig-order-preview">
        <div className="">
            <img src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/241886721/original/5eb50249fc92fb86a041044def0812650db3dfdf.jpg" alt="" />
            {/* <img src={order.gig.imgUrl} alt="" /> */}
            <span>{order.gig.name}</span>
        </div>
        <div>
            <span>{order.createdAt}</span>
            <span>{order.gig.price}$</span>
            {/* gig.price */}
            {/* <span className={`button-${status}`} onClick={ev => (changeSttatus(ev, order, 'completed'))}>{status}</span> */}
            {buttonSwitch(order.status)}
        </div>
    </article>
    // user && user.type === "seller" && 
}




