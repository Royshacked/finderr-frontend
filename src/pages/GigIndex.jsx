import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function GigIndex() {

    return (
        <main className="gig-index">
            <header>
                <h2>Gigs</h2>
            </header>
        </main>
    )
}