import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { GigIndex } from './pages/GigIndex.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { ReviewEdit } from './cmps/ReviewEdit.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { LoginSignup } from './cmps/LoginSignup.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import { GigOrderIndex } from './pages/GigOrderIndex.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'



export function RootCmp() {
    return (
        <Provider store={store}>
            <Router>
                <div >
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/gig" element={<GigIndex />} />
                            <Route path="/gig/createreview/:gigId" element={<ReviewEdit />} />
                            <Route path="/review/:gigId/:reviewId" element={<ReviewEdit />} />

                            {/* <Route path="/order" element={<GigOrderIndex />} /> */}
                            <Route path="/order" element={<GigOrderIndex isSeller={false} />} />
                            <Route path="/dashboard" element={<GigOrderIndex isSeller={true} />} />
                            <Route path="/gig/:gigId" element={<GigDetails />} />
                            <Route path="/login" element={<LoginSignup isLogin={true} />} />
                            <Route path="/signup" element={<LoginSignup isLogin={false} />} />
                        </Routes>
                    </main>
                    <AppFooter />
                </div>
            </Router>
            <UserMsg />
        </Provider>
    )
}


