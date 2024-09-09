import React from "react";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


import { gigService } from "../services/gig/gig.service.remote.js"
import StarFull from '../assets/svg/details/star-full.svg?react'
import StarEmpty from '../assets/svg/details/star-empty.svg?react'


export function SimpleSlider() {
    const [gig, setGig] = useState(null)
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
                navigate('/api/gig')
            })
    }


    var settings_2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [

            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            ,
            // {
            //     breakpoint: 600,
            //     settings: {
            //         slidesToShow: 4,
            //         slidesToScroll: 4,
            //         initialSlide: 4
            //     }
            // }, {
            //     breakpoint: 1024,
            //     settings: {
            //         slidesToShow: 4,
            //         slidesToScroll: 4,
            //         infinite: true,
            //         dots: true
            //     }
            // }
        ]
    }; return (
        <div className="carusel-img-present">

            <Slider {...settings_2}>


                {gig && gig.imgUrls.length > 0 && gig.imgUrls.map(img => {
                    return <div className="imagePresrnt">
                        <img src={img} alt="" />
                    </div>
                })}

            </Slider>
        </div>
    );
}
//Programming & Tech Graphics & Design digital marketing writing & 
//translation video & animation ai services music & audio business
//consulting
// \  <div className="box">
// <h3>video & animation</h3>
// </div>
// <div className="box">
// <h3>ai services</h3>
// </div>
// <div className="box">
// <h3>music & audio</h3>
// </div>
// <div className="box">
// <h3>business</h3>
// </div>
// <div className="box">
// <h3>consulting</h3>
// </div>

{/* <div className="box">
<h3>rogramming & Tech</h3>
</div>
<div className="box slick-active slick-current">
<h3>Graphics & Design</h3>
</div>
<div className="box">
<h3>digital marketing</h3>
</div>
<div className="box">
<h3>writing & translation</h3>
</div> */}