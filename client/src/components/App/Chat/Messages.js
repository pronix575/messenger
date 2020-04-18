import React from 'react'
import { Message } from './Msg'

export const Messages = ({ messages }) => {
    
    return (
        <div className="MessagesArea">
            { !!messages.length &&
                messages.map( (message, i) => <Message key={ i } message={ message } index={ i } /> )
            }
        </div>
    )
}