import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../components/App/Button/Button'
import { logout } from '../../redux/actions/authActions'
import { AvatarImage } from '../../components/Settings/AvatarImage'
import { openChangeAvatarWindow } from '../../redux/actions/settingsActions'

export const SettingsPage = () => {

    const dispatch = useDispatch()
    
    const token = useSelector(state => state.auth.token)

    const logoutHandler = () => {
        dispatch(logout(token))
    }

    const avatar = useSelector(state => state.user.avatarUrl)

    const { name, shortid, email } = useSelector(state => state.auth)
    
    return (
        <>

            <div className="flex"> 
                <div className="SettingsPage">
                    <div className="settingsContainer flex" style={{ "justifyContent": "space-between" }}>
                        <div>
                            <h3>{ name }</h3>
                            <p>email: { email }</p>
                            <p>id: { shortid }</p>
                        </div>    

                        <div onClick={ () => dispatch(openChangeAvatarWindow()) } style={{ cursor: "pointer" }} className="settingsAvatar">
                            <AvatarImage 
                                imageurl={ avatar }
                                styles={{ 
                                    "minWidth": "80px", 
                                    "height": "80px", 
                                    "borderRadius": 
                                    "8px", "fontSize": "80px" 
                            }} />
                        </div>
                    </div>

                    <Button 
                        text={ "log out" } 
                        action={ logoutHandler } 
                        styles={{ 
                            margin: "15px 0 0 0", 
                            borderRadius: "8px", 
                            width: "100%",
                            maxWidth: "480px",
                            padding: "8px",
                            // background: "linear-gradient(45deg, #5700c9, #ff1e1e)",
                            color: "black",

                            //border: "3px solid white"
                        }}
                        classList={ "flex" }
                        />
                </div>
            </div>    
        </>
    )
}