import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../components/App/Button/Button'
import { logout } from '../../redux/actions/authActions'
import { AvatarImage } from '../../components/Settings/AvatarImage'
import { ChangeAvatarWindow } from '../../components/App/ActionWIndows/ChageAvatarWindow'
import { openChangeAvatarWindow } from '../../redux/actions/settingsActions'

export const SettingsPage = () => {

    const changeWindow = useSelector(state => state.user.changeAvatarWindow)

    const dispatch = useDispatch()
    
    const logoutHandler = () => {
        dispatch(logout())
    }

    const { name, shortid, email } = useSelector(state => state.auth)
    
    return (
        <>
            { changeWindow && <ChangeAvatarWindow /> }

            <div className="flex"> 
                <div className="SettingsPage">
                    <div className="settingsContainer flex" style={{ "justifyContent": "space-between" }}>
                        <div>
                            <h3>{ name }</h3>
                            <p>email: { email }</p>
                            <p>id: { shortid }</p>
                        </div>    

                        <AvatarImage styles={{ 
                            "minWidth": "80px", 
                            "height": "80px", 
                            "borderRadius": 
                            "8px", "fontSize": "80px" 
                        }} />
                    </div>

                    <div className="settingsContainer flex-end">
                        <div>avatar</div>
                        <Button text="change" action={ () => dispatch(openChangeAvatarWindow()) } />
                    </div>

                    <Button 
                        text={ "log out" } 
                        action={ logoutHandler } 
                        styles={{ 
                            margin: "15px 0 0 0", 
                            borderRadius: "10px", 
                            width: "100%",
                            maxWidth: "480px",
                            padding: "8px",
                            background: "linear-gradient(45deg, #5700c9, #ff1e1e)",
                            color: "white",
                            border: "3px solid white"
                        }}
                        classList={ "flex" }
                        />
                </div>
            </div>    
        </>
    )
}