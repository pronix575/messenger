import React from 'react'

export const Message = ({ message, index }) => 
    <>
        { index % 3 === 0 ?
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