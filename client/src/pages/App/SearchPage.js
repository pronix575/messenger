import React, { useState, useCallback } from 'react'
import { Button } from '../../components/App/Button/Button'
import { SearchIcon } from '../../components/App/Icons/SearchIcon'
import { useSelector, useDispatch } from 'react-redux'
import { addUsersInSerach, clearUsersInSearch } from '../../redux/actions/searchActions'
import { ADD_USERS_IN_SEARCH, CLEAR_USERS_IN_SEARCH } from '../../redux/types'

export const SearchPage = () => {

    const token = useSelector(state => state.auth.token)
    var users = useSelector(state => state.users.usersInSearch)
    
    const dispatch = useDispatch()
    
    const [form, setForm] = useState({ search: '' })
    
    const changeHandler = useCallback( async event => {
        event.preventDefault()
        setForm({ ...form, [event.target.name]: event.target.value }) 

        try {

            if (!form.search || form.search.length <= 1) {
                return dispatch(clearUsersInSearch())
            }

            const data = await fetch(`/api/users/name/${ form.search }`, {
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
    }, [form, token, dispatch, setForm])

    const submitHandler = useCallback( async event => {
        event.preventDefault()

        try {

            if (!form.search) {
                return dispatch(clearUsersInSearch())
            }

            const data = await fetch(`/api/users/name/${ form.search }`, {
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
    }, [form, token, dispatch])

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
                
                { users.map( user => <div key={ user.shortid }><h1>{ user.name }</h1></div> ) }

                { !users && <Button action={ () => dispatch({ type: CLEAR_USERS_IN_SEARCH }) } text="clear" /> }
            </div>
        </div>
    )
}