import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../components/App/Button/Button'
import { logout } from '../../redux/actions/authActions'
import { setAvatar } from '../../redux/actions/userActions'

export const SettingsPage = () => {

    const dispatch = useDispatch()

    const [file, setFile] = useState(null)

    const logoutHandler = () => {
        dispatch(logout())
    }

    const onSubmitHandler = useCallback(async event => {
        event.preventDefault()

        const avatar = new FormData();
        avatar.append('avatar', file);

        try {
            const response = await fetch('/api/upload/avatar', {
                method: 'POST',
                body: avatar
            })

            console.log(response)

            if (response) {
                const data = await response.json()
                console.log(data)

                dispatch(setAvatar(data.file.filename))
            }
            

        } catch (e) {
         
            console.warn(e)
        }
    }, [file, dispatch])

    const onChangeHandler = event => {
        setFile(event.target.files[0])
    }

    const { name, shortid, email } = useSelector(state => state.auth)
    
    return (
        <div className="SettingsPage">
            <div className="settingsContainer">
                <h3>{ name }</h3>
                <p>email: { email }</p>
                <p>id: { shortid }</p>
            </div>

            <div className="settingsContainer">
                <form onSubmit={ onSubmitHandler }>
                    <input type="file" accept="image/png, image/jpeg" name="avatar" onChange={ onChangeHandler } />
                    <button type="submit">submit</button>
                </form>
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
                    "background": "linear-gradient(45deg, #5700c9, #ff1e1e)",
                    color: "white"
                }}
                classList={ "flex" }
                />
        </div>
    )
}