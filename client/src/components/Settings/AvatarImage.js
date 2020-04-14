import React from 'react'
import { AvatarIcon } from '../App/Icons/AvatarIcon'

export const AvatarImage = ({ styles, imageurl }) => {

    // const { avatarUrl } = useSelector(state => state.user)


    const avatarImg = <div style={{
        ...styles,
        "backgroundImage": `url(/${ imageurl })`
    }} className="headerAvatarImg"></div>

    
    const avatar = !!imageurl ? avatarImg : <AvatarIcon styles={{ ...styles }} classList={ "flex" }  /> 

    return avatar
}