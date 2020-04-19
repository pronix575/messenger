import React from 'react'
import { useSelector } from 'react-redux'

export const Message = ({ message }) => { 

    const id = useSelector(state => state.auth.userId)

    return (
        <>
            { message.creator === id ?
                <div className="flex-end">
                    <div></div>
                    <div className="messageFrom" >{ message.text }</div>
                </div> : 

                <div className="flex-end">
                    <div className="messageTo" >{ message.text }</div>
                    <div></div>
                </div>        
            }      
        </>
    )    
}