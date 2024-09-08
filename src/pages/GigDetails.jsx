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
export function GigDetails() {
  const [gig, setGig] = useState(null)
  const [userPlan, setUserPlan] = useState('entry')
  const { gigId } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if (gigId) loadGig()
  }, [gigId])


  function loadGig() {
    gigService.getById(gigId)
      .then(gig => setGig(gig))
      .catch(err => {
        console.log('Had issues in gig details', err)
        //navigate('/gig')
      })
  }

  function setPlan(plan) {
    setUserPlan(plan)
  }
  if (!gig) return <div>Loading...</div>

  return <section className="main-layoutes">
    <article className="gig-page flex">
      <main class="gig-main-layout">


        {/* <aside className="sidebar-content">hhhhh</aside> */}
        <h1 className="gig-title-details flex">{gig.title}</h1>
        <div className="mini-user-container flex">
          <div className="user-details-container flex">
            <div className="mini-user-name&level flex">
              <div className="mini-user-name flex">{gig.owner.fullname}</div>
              <div className="mini-user-level flex">
                <div className={gig.owner.level < 3 ? "mini-user-level-txt" : "mini-user-level-txt user-premium"
                }>
                  {gig.owner.level < 3 ? `level ${gig.owner.level}` :
                    `top rated ${gig.owner.level}`}
                </div>
                <div className="mini-user-level-stars flex">
                  <StarFull />
                  {gig.owner.level > 1 ? <StarFull /> : <StarEmpty />}
                  {gig.owner.level > 2 ? <StarFull /> : <StarEmpty />}


                </div>
              </div>


            </div>
            <div className="mini-user-orders&rating">
              <div className="mini-user-rating">
                <div className="mini-user-stars"></div>
                <div className="mini-user-score"></div>
                <div className="mini-user-review-numbers"></div>
              </div>
              <div className="mini-user-orders">
                <div></div>
              </div>

            </div>
          </div>

          <div className="mini-user-img-container">
            <img src="https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/161c166093aab986aac2d70cfdf82ad9-1497643481685049984.203679/8E7C2C6F-DCAF-4181-A913-1EE6D61BA282" alt=""
              className="mini-user-img" />

          </div>
        </div>
        <SimpleSlider />
        {/* <span><b>Ad By</b> {gig.owner.fullname}</span> */}
        {/* <span>{gig.title}</span> */}
        {/* <span>{gig._id}</span> */}
        {/* <img src={gig.imgUrls[0]} alt="" /> */}
        {/* <img src="../assets/images/homepage/4.jpeg" alt="" /> */}
        {/* <span><b>Rate </b>{gig.owner.rate}</span> */}
        {/* <span><b>From</b> {gig.price}$</span> */}
        {gig && <UserDetailsRevies gig={gig} />}
        {gig && <ReviewDetailes gig={gig} />}
      </main>
      <div className="side-bar-container">
        <div className="side-bar-inner-container">
          <div className="side-bar-content">
            <div className="side-bar-header flex">
              <div className="side-bar-header-collect flex">
                <div className="heart-container">
                  <Heart />
                </div>
                <span className="collect-num">509</span>
              </div>
              <span className="collect-num">
                <Share />
              </span>

            </div>
            <div className="side-bar-plans">
              <div className="plans-picker flex">
                <div className={userPlan === 'entry' ? 'entry active' : 'entry '} onClick={() => setPlan('entry')} >entry</div>
                <div className={userPlan === 'commun' ? 'commun active' : 'commun '} onClick={() => setPlan('commun')} >commun</div>
                <div className={userPlan === 'premium' ? 'premium active' : 'premium '} onClick={() => setPlan('premium')}>premium</div>
              </div>
              {gig.price && <PlansDescription planType={userPlan} gig={gig} />}


            </div>
            <div className="side-bar-contact flex">

              <div className='contact-container-inner flex'>
                <button>contact me</button>
              </div>


            </div>
          </div>
        </div>
      </div>

    </article>
  </section>
}