import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <div className='container mt-3'>
                <h6 style={{ paddingTop: '40px', paddingLeft: '180px', backgroundColor: '#B9E2ED' }}>
                    <b>© 2023 <Link to='https://kmatechnoware.com/'>Kma Teach</Link>, PVT.   Hisar   All Rights   Reserved.</b>
                </h6>
            </div>
        </>

    )
}

export default Footer