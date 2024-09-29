import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { loadGig } from "../store/actions/gig.actions.js"
import { useSelector } from "react-redux"
import { GigPreviewCarousel } from "../cmps/GigPreviewCarousel.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { addOrder } from "../store/actions/order.actions.js"

import StarFull from '../assets/svg/details/star-full.svg?react'
import StarEmpty from '../assets/svg/details/star-empty.svg?react'


export function GigDetails() {
  const user = useSelector(state => state.userModule.user)
  const gig = useSelector(state => state.gigModule.gig)
  const [userPlan, setUserPlan] = useState('basic')
  const [userPlanPrice, setUserPlanPrice] = useState(0)
  const { gigId } = useParams()

  useEffect(() => {
    if (!gigId) return
    setGig()
  }, [])

  async function setGig() {
    try {
      const loadedGig = await loadGig(gigId)
      setUserPlanPrice(loadedGig.price)
    } catch (error) {
      console.log(error)
    }
  }

  function setPlan(plan, price) {
    setUserPlan(plan)
    setUserPlanPrice(price)
  }

  async function createOrder(ev) {
    ev.preventDefault()
    if (!user) return showErrorMsg('Please signup')

    const order = {
      buyer: {
        id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl
      },
      seller: {
        id: gig.owner._id,
        fullname: gig.owner.fullname,
        imgUrl: gig.owner.imgUrl
      },
      gig: {              // mini-gig
        _id: gig._id,
        name: gig.title,
        imgUrl: gig.imgUrls[0],
        price: userPlanPrice
      },
      createdAt: Date.now(),
      status: 'pending',
    }

    try {
      await addOrder(order)
      showSuccessMsg('Your order accepted')
    } catch (error) {
      showErrorMsg('Could\'nt complete purchase')
      console.log(error)
    }
  }

  if (!gig) return <div>Loading...</div>

  return <main className="gig-details main-layout">
    <section>
      <div className="card-container">
        <h2>{gig.title}</h2>

        <div className="card-user">
          <img src={gig.owner.imgUrl} alt="" />

          <div >
            <span><b>{gig.owner.fullname.charAt(0).toUpperCase() + gig.owner.fullname.slice(1)} </b></span>
            {gig.owner.level === 'pro' && <span>{gig.owner.level}</span>}

            <div className="flex">
              <b>Level {gig.owner.rate}</b>
              <span>
                <StarFull />
                {gig.owner.rate > 1 ? <StarFull /> : <StarEmpty />}
                {gig.owner.rate > 2 ? <StarFull /> : <StarEmpty />}
              </span>
            </div>
          </div>
        </div>

        <div className="img-carousel">
          <GigPreviewCarousel imgs={gig.imgUrls} />
        </div>

        <h3>About this gig</h3>
        <p>{gig.description}</p>

        <div className="card-packages">
          <h3>Compare packages</h3>
          <table>
            <tbody>
              <tr className="package-type">
                <th className="package-row-label">Package</th>
                <th className="package-type-price" >
                  <div className="price-wrapper">
                    <p className="price">{gig.price}$</p>
                  </div>
                  <b className="type">Basic</b>
                  <b className="title">{gig.tags}</b>
                </th>
                <th className="package-type-price">
                  <div className="price-wrapper">
                    <p className="price">{gig.price * 1.5}$</p>
                  </div>
                  <b className="type">Standard</b>
                  <b className="title">{gig.tags}</b>
                </th>
                <th className="package-type-price">
                  <div className="price-wrapper">
                    <p className="price">{gig.price * 2}$</p>
                  </div>
                  <b className="type">Premium</b>
                  <b className="title">{gig.tags}</b>
                </th>
              </tr>
              <tr className="description">
                <td className="package-row-label"></td>
                <td>One small {gig.tags} issue with WordPress</td>
                <td>Normal {gig.tags} or JS issue with WordPress upto 30 minute fix</td>
                <td>Complex {gig.tags} or JS Issue with WordPress upto 1 hour fix</td>
              </tr>
              <tr>
                <td className="package-row-label">
                  <div className="">
                    <span className="">Revisions</span>
                  </div>
                </td>
                <td>Unlimited</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>

              <tr className="delivery-time">
                <td className="package-row-label">Delivery Time</td>
                <td>3 days</td>
                <td>2 days</td>
                <td>1 day</td>
              </tr>

              <tr className="select-package">
                <td className="package-row-label">Total</td>
                <td>
                  <div className="price-wrapper">
                    <p className="tbody-5">{gig.price}$</p>
                  </div>
                  <button className="co-white btn-select-package bg-co-black" onClick={(ev) => createOrder(ev)}>Select</button>
                </td>
                <td>
                  <div className="price-wrapper">
                    <p className="tbody-5">{gig.price * 1.5}$</p>
                  </div>
                  <button className="co-white btn-select-package bg-co-black" onClick={(ev) => createOrder(ev)}>Select</button>
                </td>
                <td>
                  <div className="price-wrapper">
                    <p className="tbody-5">{gig.price * 2}$</p>
                  </div>
                  <button className="co-white btn-select-package bg-co-black" onClick={(ev) => createOrder(ev)}>Select</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <div className="side-bar-container">
        <div className="side-bar-btns flex">
          <div className={userPlan === 'basic' ? 'basic active' : 'basic'} onClick={() => setPlan('basic', gig.price)} >Basic</div>
          <div className={userPlan === 'standard' ? 'standard active' : 'standard'} onClick={() => setPlan('standard', gig.price * 1.5)} >Standard</div>
          <div className={userPlan === 'premium' ? 'premium active' : 'premium'} onClick={() => setPlan('premium', gig.price * 2)}>Premium</div>
        </div>

        <div className="side-bar-title">
          <span>{userPlan}</span>
          <span>{userPlanPrice}$</span>
        </div>

        <div className="side-bar-details">
          <span className="title">The {userPlan} plan in {gig.tags}</span>
          <span className="plan">
            <svg width="11" height="9" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg"><path d="M3.64489 8.10164L0.158292 4.61504C-0.0511769 4.40557 -0.0511769 4.06594 0.158292 3.85645L0.916858 3.09786C1.12633 2.88837 1.46598 2.88837 1.67545 3.09786L4.02419 5.44658L9.05493 0.41586C9.2644 0.206391 9.60405 0.206391 9.81352 0.41586L10.5721 1.17445C10.7816 1.38392 10.7816 1.72355 10.5721 1.93303L4.40348 8.10166C4.19399 8.31113 3.85436 8.31113 3.64489 8.10164V8.10164Z"></path></svg>
            Includes a {userPlan} product with {userPlan} QA
          </span>
        </div>

        <div className="side-bar-purchase">
          <button onClick={(ev) => createOrder(ev)}>
            Purchase
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z"></path></svg>
          </button>
        </div>

        <div className="side-bar-contact">
          <button>Contact</button>
        </div>

      </div>
    </section>
  </main>
}

