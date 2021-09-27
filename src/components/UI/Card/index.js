import React from 'react'

import './style.css'

const Card = (props) => {
    return (
        <div className="Card">
             {props.children}
        </div>
    )
}

export default Card
