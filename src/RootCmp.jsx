import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { GigIndex } from './pages/GigIndex.jsx'
import { GigDetails } from './pages/GigDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { LoginSignup } from './cmps/LoginSignup.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'



export function RootCmp() {
    return (
        <Provider store={store}>
            <Router>
                <div className="main-container">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/gig" element={<GigIndex />} />
                            <Route path="/gig/:gigId" element={<GigDetails />} />
                            <Route path="/login" element={<LoginSignup />} />
                        </Routes>
                    </main>
                    <AppFooter />
                </div>
            </Router>
        </Provider>
    )
}


