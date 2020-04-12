import React from 'react'

import  './Button.scss'

export const Button = ({ action, styles, text, type, classList }) => {
    return (
        <button type={ type } className={ "app-button flex " + classList }  style={{ ...styles, textDecoration: 'throw-line' }} onClick={ action }>{ text }</button>
    )
}