import React from "react";
import Slider from "react-slick";

export function SimpleSlider() {
    var settings_2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [

            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
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
        <div className="carusel">
            <Slider {...settings_2}>

                <div className="box">
                    <h3>rogramming & Tech</h3>
                </div>
                <div className="box">
                    <h3>Graphics & Design</h3>
                </div>
                <div className="box">
                    <h3>digital marketing</h3>
                </div>
                <div className="box">
                    <h3>writing & translation</h3>
                </div>
                <div className="box">
                    <h3>video & animation</h3>
                </div>
                <div className="box">
                    <h3>ai services</h3>
                </div>
                <div className="box">
                    <h3>music & audio</h3>
                </div>
                <div className="box">
                    <h3>business</h3>
                </div>
                <div className="box">
                    <h3>consulting</h3>
                </div>
            </Slider>
        </div>
    );
}
//Programming & Tech Graphics & Design digital marketing writing & 
//translation video & animation ai services music & audio business
//consulting