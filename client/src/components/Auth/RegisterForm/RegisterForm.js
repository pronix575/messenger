import React, { useState, useCallback } from 'react'
import { Button } from '../../App/Button/Button'
import { register } from '../../../redux/actions/authActions'
import { useHistory } from 'react-router-dom'
import { Loader } from '../../App/Loaders/Loader'


export const RegisterForm = () => {
    const history = useHistory()
    
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const submitHandler = useCallback( async event => {
        event.preventDefault()

        try {
            setLoading(true)
            const data  = await register({ ...form })
            console.log(data, "hhh")
            
            if (data.type === 'CREATED') {
                history.push('/sign-in')
                console.log(data)
            }

            setLoading(false)
        } catch (e) {
            console.warn(e)
            setLoading(false)
        }    
    }, [form, history])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <form className="authForm" onSubmit={ submitHandler }>
            <div className="flex" style={{ "justifyContent": "space-between", "alignItems": "center" }}>    
                <h2>Register</h2>

                { loading && <Loader /> }

            </div>

            <p>name:</p>
            <input 
                type="text" 
                name="name" 
                placeholder="type name..." 
                onChange={ changeHandler } 
                value={ form.name }
            />
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
                    "borderRadius": "100px",
                }} text={ "create accaunt" } type={ "submit" } />
            </div>
        </form>
    )
}