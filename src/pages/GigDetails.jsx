import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { SimpleSlider } from "../cmps/Carusela copy"

import { gigService } from "../services/gig/gig.service.local"
import StarFull from '../assets/svg/details/star-full.svg?react'
import StarEmpty from '../assets/svg/details/star-empty.svg?react'
import Heart from '../assets/svg/details/heart.svg?react'
export function GigDetails() {
  const [gig, setGig] = useState(null)
  const [userPlan, setUserPlan] = useState('basic')
  const { gigId } = useParams()


  useEffect(() => {
    if (gigId) loadGig()
  }, [gigId])

  function loadGig() {
    gigService.getById(gigId)
      .then(gig => setGig(gig))
      .catch(err => {
        console.log('Had issues in gig details', err)
        navigate('/gig')
      })
  }
  // console.log(gig)

  if (!gig) return <div>Loading...</div>

  return <article className="gig-page flex">
    <main class="gig-main-layout">



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
    </main>
    <div className="side-bar-container">
      <div className="side-bar-inner-container">
        <div className="side-bar-content">
          <div className="side-bar-header">

          </div>
          <div className="side-bar-plans">

          </div>
          <div className="side-bar-contact"></div>
        </div>
      </div>
    </div>
  </article>
}