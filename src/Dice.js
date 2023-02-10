import React from 'react'

export default function Dice(props){
    return(
        <div className={props.isHeld ? 'dice--green' : 'dice' }
             onClick={props.toggleIsHeld}>

            <h2 className='dice--number'>{props.number}</h2>

        </div>
    )
}