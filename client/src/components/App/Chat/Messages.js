import React from 'react'
import { Message } from './Msg'

export const Messages = ({ messages }) => {

    return (
        <div className="MessagesArea">
            { !!messages.length &&
                messages.map( (message) => <Message key={ message._id } message={ message } /> )
            }
        </div>
    )
}