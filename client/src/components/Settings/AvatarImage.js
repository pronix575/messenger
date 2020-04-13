import React from 'react'
import { useSelector } from 'react-redux'
import { AvatarIcon } from '../App/Icons/AvatarIcon'

export const AvatarImage = ({ styles }) => {

    const { avatarUrl } = useSelector(state => state.user)

    const avatarImg = <div style={{
        ...styles,
        "backgroundImage": `url(/${ avatarUrl })`
    }} className="headerAvatarImg"></div>

    
    const avatar = !!avatarUrl ? avatarImg : <AvatarIcon styles={{ ...styles }} classList={ "flex" }  /> 

    return avatar
}