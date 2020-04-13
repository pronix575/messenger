import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './actionWindows.scss'
import { setAvatar } from '../../../redux/actions/userActions'
import { Button } from '../Button/Button'
import { closeChangeAvatarWindow } from '../../../redux/actions/settingsActions'
import { Loader } from '../../App/Loaders/Loader'
import { CloseIcon } from '../Icons/CloseIcon'

export const ChangeAvatarWindow = () => {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const onSubmitHandler = useCallback(async event => {
        event.preventDefault()

        if (!file) {
            return null
        }

        const avatar = new FormData();
        avatar.append('avatar', file);
        
        try {

            setLoading(true)

            const response = await fetch('/api/upload/avatar', {
                method: 'POST',
                body: avatar,
                headers: { authorization: `Bearer ${ auth.token }` } 
            })

            setLoading(false)

            if (response) {
                const data = await response.json()

                dispatch(setAvatar(data.file.filename))
                dispatch(closeChangeAvatarWindow())
            }
            

        } catch (e) {
         
            console.warn(e)
        }
    }, [file, dispatch, auth])

    const onChangeHandler = event => {

        setFile(event.target.files[0])
        console.log(event.target.files)
    }

    return (
        <>
            <div className="ChangeAvatarWindowContainer flex">
                <div className="ChangeAvatarWindow">
                    <form onSubmit={ onSubmitHandler }>

                        {/* <div className="flex-end">
                            <div></div>
                            <Button text={ <CloseIcon /> } styles={{ "background": "red", "color": "white" }} action={ () => dispatch(closeChangeAvatarWindow()) } />
                        </div> */}
                        
                        <div className="flex" style={{ margin: "15px 0 0 0" }}>
                            <input 
                                className="avatarChangingField" 
                                type="file" 
                                accept="image/png, image/jpeg" 
                                name="avatar" 
                                onChange={ onChangeHandler } 
                                id="avatar"
                            />
                            
                            <label className="avatarChangingFieldLabel flex" htmlFor="avatar">

                                { loading ? 
                                    <Loader styles={{ margin: "0 0 5px 0" }} /> :
                                    
                                    file ? file.name : 
                                        
                                        <div>
                                            + ADD IMAGE
                                        </div>         
                                }  
                            </label>
                        </div>

                        { file && <div className="flex">
                            <Button type="submit" text="submit" styles={{ margin: "15px 0 0 0" }}/>
                        </div> }
                    </form>
                </div>
                <div className="closePanel" onClick={ () => dispatch(closeChangeAvatarWindow()) }></div>
            </div>
        </>
    )
}