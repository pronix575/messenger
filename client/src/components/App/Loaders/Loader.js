import React from 'react'
import './loader.scss'

export const Loader = ({ styles }) => 
    <>
        <div className="lds-ring">
            <div style={{ ...styles }}></div>
            <div style={{ ...styles }}></div>
            <div style={{ ...styles }}></div>
            <div style={{ ...styles }}></div>
        </div>
    </>