import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { SimpleSlider } from "../cmps/Carusela copy"

import { ReviewDetailes } from "../cmps/details/Reviews.jsx"
import { useNavigate } from "react-router-dom"


import StarFull from '../assets/svg/details/star-full.svg?react'
import StarEmpty from '../assets/svg/details/star-empty.svg?react'
import Heart from '../assets/svg/details/heart.svg?react'
import Share from '../assets/svg/details/share.svg?react'
import { PlansDescription } from "../cmps/details/PlansDescription"
import { UserDetailsRevies } from "../cmps/details/UserDetails&Revies"
import { loadGig } from "../store/actions/gig.actions.js"
import { useSelector } from "react-redux"
import { GigPreviewCarousel } from "../cmps/GigPreviewCarousel.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { addOrder } from "../store/actions/order.actions.js"

export function GigDetails() {
  const user = useSelector(state => state.userModule.user)
  const gig = useSelector(state => state.gigModule.gig)
  const [userPlan, setUserPlan] = useState('entry')
  const { gigId } = useParams()

  useEffect(() => {
    if (!gigId) return
    setGig()
  }, [])

  async function setGig() {
    try {
      await loadGig(gigId)
    } catch (error) {
      console.log(error)
    }
  }

  function setPlan(plan) {
    setUserPlan(plan)
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
        price: gig.price
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
            <span><b>{gig.owner.fullname}</b></span>
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
              <tr class="package-type">
                <th class="package-row-label">Package</th>
                <th class="package-type-price" >
                  <div class="price-wrapper">
                    <p class="price">{gig.price}$</p>
                  </div>
                  <b class="type">Basic</b>
                  <b class="title">{gig.tags}</b>
                </th>
                <th class="package-type-price">
                  <div class="price-wrapper">
                    <p class="price">{gig.price * 1.5}$</p>
                  </div>
                  <b class="type">Standard</b>
                  <b class="title">{gig.tags}</b>
                </th>
                <th class="package-type-price">
                  <div class="price-wrapper">
                    <p class="price">{gig.price * 2}$</p>
                  </div>
                  <b class="type">Premium</b>
                  <b class="title">{gig.tags}</b>
                </th>
              </tr>
              <tr class="description">
                <td class="package-row-label"></td>
                <td>One small {gig.tags} issue with WordPress</td>
                <td>Normal {gig.tags} or JS issue with WordPress upto 30 minute fix</td>
                <td>Complex {gig.tags} or JS Issue with WordPress upto 1 hour fix</td>
              </tr>
              <tr>
                <td class="package-row-label">
                  <div class="">
                    <span class="">Revisions</span>
                  </div>
                </td>
                <td>Unlimited</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>

              <tr class="delivery-time">
                <td class="package-row-label">Delivery Time</td>
                <td>3 days</td>
                <td>2 days</td>
                <td>1 day</td>
              </tr>

              <tr class="select-package">
                <td class="package-row-label">Total</td>
                <td>
                  <div class="price-wrapper">
                    <p class="tbody-5">{gig.price}$</p>
                  </div>
                  <button class="co-white btn-select-package bg-co-black" onClick={(ev) => createOrder(ev)}>Select</button>
                </td>
                <td>
                  <div class="price-wrapper">
                    <p class="tbody-5">{gig.price * 1.5}$</p>
                  </div>
                  <button class="co-white btn-select-package bg-co-black" onClick={(ev) => createOrder(ev)}>Select</button>
                </td>
                <td>
                  <div class="price-wrapper">
                    <p class="tbody-5">{gig.price * 2}$</p>
                  </div>
                  <button class="co-white btn-select-package bg-co-black" onClick={(ev) => createOrder(ev)}>Select</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <div className="side-bar-container">
        <div className="side-bar">
          <div className="side-bar-btns flex">
            <div className={userPlan === 'entry' ? 'entry active' : 'entry'} onClick={() => setPlan('entry')} >Basic</div>
            <div className={userPlan === 'commun' ? 'commun active' : 'commun'} onClick={() => setPlan('commun')} >Standard</div>
            <div className={userPlan === 'premium' ? 'premium active' : 'premium'} onClick={() => setPlan('premium')}>Premium</div>
          </div>

          {gig.price && <PlansDescription planType={userPlan} gig={gig} createOrder={createOrder} />}

          <div className="side-bar-contact flex">
            <div className='contact-container-inner flex'>
              <button>contact me</button>
            </div>
          </div>

        </div>
      </div>

    </section>
  </main>
}
//   return <section className="gig-details main-layout">
//     <article className="gig-page flex">
//       <main class="gig-main-layout">
//         {/* <aside className="sidebar-content">hhhhh</aside> */}
//         <h1 className="gig-title-details flex">{gig.title}</h1>
//         <div className="mini-user-container flex">
//           <div className="user-details-container flex">
//             <div className="mini-user-name&level flex">
//               <div className="mini-user-name flex">{gig.owner.fullname}</div>
//               <div className="mini-user-level flex">
//                 <div className={gig.owner.level < 3 ? "mini-user-level-txt" : "mini-user-level-txt user-premium"
//                 }>
//                   {gig.owner.level < 3 ? `level ${gig.owner.level}` :
//                     `top rated ${gig.owner.level}`}
//                 </div>
//                 <div className="mini-user-level-stars flex">
//                   <StarFull />
//                   {gig.owner.level > 1 ? <StarFull /> : <StarEmpty />}
//                   {gig.owner.level > 2 ? <StarFull /> : <StarEmpty />}


//                 </div>
//               </div>


//             </div>
//             <div className="mini-user-orders&rating">
//               <div className="mini-user-rating">
//                 <div className="mini-user-stars"></div>
//                 <div className="mini-user-score"></div>
//                 <div className="mini-user-review-numbers"></div>
//               </div>
//               <div className="mini-user-orders">
//                 <div></div>
//               </div>

//             </div>
//           </div>

//           <div className="mini-user-img-container">
//             <img src="https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/161c166093aab986aac2d70cfdf82ad9-1497643481685049984.203679/8E7C2C6F-DCAF-4181-A913-1EE6D61BA282" alt=""
//               className="mini-user-img" />

//           </div>
//         </div>
//         <SimpleSlider />
//         {/* <span><b>Ad By</b> {gig.owner.fullname}</span> */}
//         {/* <span>{gig.title}</span> */}
//         {/* <span>{gig._id}</span> */}
//         {/* <img src={gig.imgUrls[0]} alt="" /> */}
//         {/* <img src="../assets/images/homepage/4.jpeg" alt="" /> */}
//         {/* <span><b>Rate </b>{gig.owner.rate}</span> */}
//         {/* <span><b>From</b> {gig.price}$</span> */}
//         {gig && <UserDetailsRevies gig={gig} />}
//         {gig && <ReviewDetailes gig={gig} />}
//       </main>
//       <div className="side-bar-container">
//         <div className="side-bar-inner-container">
//           <div className="side-bar-content">
//             <div className="side-bar-header flex">
//               <div className="side-bar-header-collect flex">
//                 <div className="heart-container">
//                   <Heart />
//                 </div>
//                 <span className="collect-num">509</span>
//               </div>
//               <span className="collect-num">
//                 <Share />
//               </span>

//             </div>
//             <div className="side-bar-plans">
//               <div className="plans-picker flex">
//                 <div className={userPlan === 'entry' ? 'entry active' : 'entry '} onClick={() => setPlan('entry')} >entry</div>
//                 <div className={userPlan === 'commun' ? 'commun active' : 'commun '} onClick={() => setPlan('commun')} >commun</div>
//                 <div className={userPlan === 'premium' ? 'premium active' : 'premium '} onClick={() => setPlan('premium')}>premium</div>
//               </div>
//               {gig.price && <PlansDescription planType={userPlan} gig={gig} />}


//             </div>
//             <div className="side-bar-contact flex">

//               <div className='contact-container-inner flex'>
//                 <button>contact me</button>
//               </div>


//             </div>
//           </div>
//         </div>
//       </div>

//     </article>
//   </section>
// }