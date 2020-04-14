import React, { useState, useCallback } from 'react'
import { Button } from '../../components/App/Button/Button'
import { SearchIcon } from '../../components/App/Icons/SearchIcon'
import { useSelector, useDispatch } from 'react-redux'
import { addUsersInSerach, clearUsersInSearch } from '../../redux/actions/usersActions'
import { ADD_USERS_IN_SEARCH, CLEAR_USERS_IN_SEARCH } from '../../redux/types'
import { User } from '../../components/Users/User'
import { CloseIcon } from '../../components/App/Icons/CloseIcon'
import { Selector } from '../../components/App/Selector/Selector'


export const SearchPage = () => {

    const [selector, setSelector] = useState('name')

    const selectors = [
        {
            name: 'name',
            action: () => setSelector('name') 
        },
        {
            name: 'email',
            action: () => setSelector('email')
        },
        {
            name: 'id',
            action: () => setSelector('id')
        }
    ]

    selectors.forEach(sel => {
        if (selector === sel.name) {
            sel.classList = "selectorContainerActive"
        }
    })

    const token = useSelector(state => state.auth.token)
    const users = useSelector(state => state.users.usersInSearch)

    const dispatch = useDispatch()
    
    const [form, setForm] = useState({ search: '' })
    
    const changeHandler = useCallback( async event => {
        event.preventDefault()
        setForm({ ...form, [event.target.name]: event.target.value }) 

        console.log(selectors)

        try {

            console.log(selector)

            if (!form.search || form.search.length <= 1) {
                return dispatch(clearUsersInSearch())
            }

            const data = await fetch(`/api/users/${ selector }/${ form.search }`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${ token }`
                }
            })

            const users = await data.json()

            if (data.message) {
                dispatch(clearUsersInSearch())
            }

            if (data) {
                dispatch({ type: ADD_USERS_IN_SEARCH, payload: users })
            }

        } catch (e) {
            console.warn(e)
        }
    }, [form, token, dispatch, setForm, selector, selectors])

    const submitHandler = useCallback( async event => {
        event.preventDefault()

        try {

            console.log(selector)

            if (!form.search) {
                return dispatch(clearUsersInSearch())
            }

            const data = await fetch(`/api/users/${ selector }/${ form.search }`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${ token }`
                }
            })

            const users = await data.json()

            if (data) {
                dispatch(addUsersInSerach(users))
            }

        } catch (e) {
            console.warn(e)
        }
    }, [form, token, dispatch, selector])

    return (
        <div className="flex">
            <div className="searchPage">

                <div className="searchContainer">
                    
                    <form className="searchForm" onSubmit={ submitHandler }>
                        <div className="flex-end" styles={{ margin: "15px 0 0 0" }}> 
                            <input className="searchField" autoFocus name="search" onChange={ changeHandler }></input>
                            <Button text={ <SearchIcon /> } styles={{ padding: "10px"}} />
                        </div>
                    </form>

                </div>

                <div className="flex-end">
                    <Selector state={ selectors } />
                    
                    { !!users.length && 
                        <div className="flex">
                            <Button 
                                action={ () => dispatch({ type: CLEAR_USERS_IN_SEARCH }) } 
                                text={ <CloseIcon styles={{ fontSize: "20px" }} /> } 
                                styles={{ 
                                    heigth: "33px",
                                    borderRadius: "8px",
                                    margin: "15px 0 0 0",
                                    background: "white",
                                    color: "red"
                                }} 
                            /> 
                        </div>    
                    }
                </div>
                
                { !!users.length &&
                    <div className="searchUsersContainer">
                        { users.map( user => <User user={ user } key={ user.shortid } /> ) }
                    </div>
                }
            </div>
        </div>
    )
}