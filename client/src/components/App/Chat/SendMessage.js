import React from 'react'
import { CursorPointer } from '../Icons/CursorPointer'
import { Button } from '../Button/Button'

export const SendMessage = ({ onClickHandler, onSubmitHandler, onChangeHandler }) => 
    <div className="sendMessageContainer">
        <form className="sendMessageForm" onSubmit={ onSubmitHandler }>
            <div className="flex-end" styles={{ margin: "15px 0 0 0" }}> 
                <input className="searchField" name="message" onChange={ onChangeHandler }></input>
                <Button type="submit" text={ <CursorPointer /> } styles={{ padding: "10px"}} />
            </div>
        </form>
    </div>