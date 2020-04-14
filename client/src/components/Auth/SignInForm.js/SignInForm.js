import React, { useState, useCallback } from 'react'
import { Button } from '../../App/Button/Button'
import { request } from '../../../http/Request'
import { login } from '../../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import { Loader } from '../../App/Loaders/Loader'

export const SignInForm = () => {

    const [ loading, setLoading ] = useState(false)

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const submitHandler = useCallback( async event => {
        event.preventDefault()

        try {

            setLoading(true)
            const data = await request('/api/auth/login', 'POST', { ...form })
            
            if (data) {
                dispatch(login(data))
            }

            setLoading(false)

        } catch (e) {
            console.warn(e)
        }

    }, [form, dispatch])

    const changeHandler = event => setForm({ ...form, [event.target.name]: event.target.value })


    const signInIcon = !loading
        ? <svg className="bi bi-box-arrow-in-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.146 11.354a.5.5 0 010-.708L10.793 8 8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M1 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 011 8z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M13.5 14.5A1.5 1.5 0 0015 13V3a1.5 1.5 0 00-1.5-1.5h-8A1.5 1.5 0 004 3v1.5a.5.5 0 001 0V3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-8A.5.5 0 015 13v-1.5a.5.5 0 00-1 0V13a1.5 1.5 0 001.5 1.5h8z" clipRule="evenodd"/>
        </svg> 

        : <Loader />

    return (
        <form className="authForm" onSubmit={ submitHandler }>
            <div className="flex" style={{ "justifyContent": "space-between", "alignItems": "center" }}>
                <h2>Sign in</h2>

                { signInIcon }
            </div>
            
            <p>email:</p>
            <input 
                type="text" 
                name="email" 
                placeholder="type email..." 
                onChange={ changeHandler } 
                value={ form.email }
            />
            <p>password:</p>
            <input 
                type="password" 
                name="password" 
                placeholder="type password..." 
                onChange={ changeHandler } 
                value={ form.password }
            />

            <div className="flex" style={{ "justifyContent": "center" }}>
                <Button styles={{
                    "background": "linear-gradient(45deg, #5700c9, #ff1e1e)",
                    "color": "white",  
                    "margin": 
                    "15px 0 0 0",
                    "boxShadow": "0 4px 6px rgba(0,0,0,.2)",
                    "padding": "10px 25px",
                    "borderRadius": "100px"
                }} text={ "log in" } />
            </div>
        </form>
    )
}