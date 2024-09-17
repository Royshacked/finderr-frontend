import React, { Component } from 'react';

import VideoAnimation from '../assets/svg/homepage/video-animation.svg?react'
import ProgrammingTech from '../assets/svg/homepage/programming-tech.svg?react'
import GraphicsDesign from '../assets/svg/homepage/graphics-design.svg?react'
import DigitalMarketing from '../assets/svg/homepage/digital-marketing.svg?react'
import WritingTranslation from '../assets/svg/homepage/writing-translation.svg?react'
import AiServices from '../assets/svg/homepage/ai-services.svg?react'
import MusicAudio from '../assets/svg/homepage/music-audio.svg?react'
import Business from '../assets/svg/homepage/business.svg?react'
import Consulting from '../assets/svg/homepage/consulting.svg?react'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { SET_FILTER_BY } from '../store/reducers/gig.reducer';

export function HomePageCategories() {
    const filterBy = useSelector(state => state.gigModule.filterBy)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onHandleCategory(category) {
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, category } })
        navigate('/gig')
    }
    return (
        <div className="sugestion-categories">
            <div className="categorie">
                <a className="categorie-link" onClick={() => onHandleCategory('logo-design')}>
                    <div className="categorie-img-container"><ProgrammingTech /></div>
                    <p className="categorie-txt">Logo-design</p>
                </a>
            </div>

            <div className="categorie">
                <a className="categorie-link" onClick={() => onHandleCategory('wordpress')}>
                    <div className="categorie-img-container"><GraphicsDesign className="svg" /></div>
                    <p className="categorie-txt"> Wordpress</p>
                </a>
            </div>

            <div className="categorie">
                <a className="categorie-link" onClick={() => onHandleCategory('accesible')}>
                    <div className="categorie-img-container"><DigitalMarketing className="svg" /></div>
                    <p className="categorie-txt">Accesible</p>
                </a>
            </div>

            <div className="categorie">
                <a className="categorie-link" onClick={() => onHandleCategory('proffesional')}>
                    <div className="categorie-img-container"><WritingTranslation className="svg" /></div>
                    <p className="categorie-txt"> Proffesional</p>
                </a>
            </div>

            <div className="categorie">
                <a className="categorie-link" onClick={() => onHandleCategory('artistic')}>
                    <div className="categorie-img-container"><VideoAnimation className="svg" /></div>
                    <p className="categorie-txt"> Artistic</p>
                </a>
            </div>

            <div className="categorie">
                <a className="categorie-link" onClick={() => onHandleCategory('programming')}>
                    <div className="categorie-img-container"><AiServices className="svg" /></div>
                    <p className="categorie-txt"> Programming</p>
                </a>
            </div>

            <div className="categorie">
                <a className="categorie-link" onClick={() => onHandleCategory('voice-over')}>
                    <div className="categorie-img-container"><MusicAudio className="svg" /></div>
                    <p className="categorie-txt"> Voice-over</p>
                </a>
            </div>

            <div className="categorie">
                <a className="categorie-link" onClick={() => onHandleCategory('digital-marketing')}>
                    <div className="categorie-img-container"><Business className="svg" /></div>
                    <p className="categorie-txt"> Digital-marketing</p>
                </a>
            </div>

            <div className="categorie">
                <a className="categorie-link" onClick={() => onHandleCategory('consulting')}>
                    <div className="categorie-img-container"><Consulting className="svg" /></div>
                    <p className="categorie-txt"> consulting</p>
                </a>
            </div>
        </div>
    )
}
