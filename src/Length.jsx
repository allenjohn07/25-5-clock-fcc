import React from 'react'
import './Length.css'


function Length({ title, changeTime, type, time, formatTime }) {
    return (
        <div style={{border:'1px solid white', padding:'10px', borderRadius:'10px'}}>
            <h3>{title}</h3>
            <div className='time-sets'>
                <button onClick={() => changeTime(-60, type)} className='btn btn-success'><i class="fa-solid fa-arrow-down"></i></button>
                <h3 style={{fontSize:'50px',fontFamily:'monospace'}}>{formatTime(time)}</h3>
                <button onClick={() => changeTime(60, type)} className='btn btn-danger'><i class="fa-solid fa-arrow-up"></i></button>
            </div>
        </div>
    )
}

export default Length