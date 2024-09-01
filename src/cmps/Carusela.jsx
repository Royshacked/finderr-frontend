import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import VideoAnimation from '../assets/svg/homepage/video-animation.svg?react'
import ProgrammingTech from '../assets/svg/homepage/programming-tech.svg?react'
import GraphicsDesign from '../assets/svg/homepage/graphics-design.svg?react'
import DigitalMarketing from '../assets/svg/homepage/digital-marketing.svg?react'
import WritingTranslation from '../assets/svg/homepage/writing-translation.svg?react'
import AiServices from '../assets/svg/homepage/ai-services.svg?react'
import MusicAudio from '../assets/svg/homepage/music-audio.svg?react'
import Business from '../assets/svg/homepage/business.svg?react'
import Consulting from '../assets/svg/homepage/consulting.svg?react'

export function DemoCarousel() {

    return (
        <div className="sugestion-categories">

            <div className="categorie">

                <div className="categorie-img-container">
                    <ProgrammingTech />   </div>
                <p className="categorie-txt">
                    Programming & Tech
                </p>


            </div>

            <div className="categorie">
                <a className="categorie-link" >
                    <div className="categorie-img-container">
                        <GraphicsDesign className="svg" />
                    </div>
                    <p className="categorie-txt"> Graphics & Design</p></a>  </div>

            <div className="categorie">
                <a className="categorie-link" >
                    <div className="categorie-img-container">
                        <DigitalMarketing className="svg" />
                    </div>
                    <p className="categorie-txt">digital marketing</p></a>
            </div>
            <div className="categorie">
                <a className="categorie-link" >
                    <div className="categorie-img-container">
                        <WritingTranslation className="svg" />
                    </div>
                    <p className="categorie-txt"> writing & translation</p></a>
            </div>
            <div className="categorie">

                <div className="categorie-img-container">
                    <VideoAnimation className="svg" />
                </div>
                <p className="categorie-txt"> video & animation</p>
            </div>
            <div className="categorie">
                <a className="categorie-link" >
                    <div className="categorie-img-container">
                        <AiServices className="svg" />
                    </div>
                    <p className="categorie-txt"> ai services</p></a>
            </div>

            <div className="categorie">
                <a className="categorie-link">
                    <div className="categorie-img-container">
                        <MusicAudio className="svg" />
                    </div>
                    <p className="categorie-txt"> music & audio</p></a>
            </div>
            <div className="categorie">
                <a className="categorie-link" >
                    <div className="categorie-img-container">
                        <Business className="svg" />
                    </div>
                    <p className="categorie-txt"> business</p></a>
            </div>
            <div className="categorie">
                <a className="categorie-link" >
                    <div className="categorie-img-container">
                        <Consulting className="svg" />
                    </div>
                    <p className="categorie-txt"> consulting</p></a>
            </div>
        </div>
    )
}

//Programming & Tech Graphics & Design digital marketing writing &
//translation video & animation ai services music & audio business
//consulting