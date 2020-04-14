import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAllUsers } from '../../redux/actions/usersActions';
import { User } from '../../components/Users/User';

export const UsersPage = () => {

    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    const initUsers = useCallback( async () => {
        
        try {

            const data = await fetch('/api/users/all', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${ token }`
                }
            })

            const allUsers = await data.json()

            if (allUsers) {
                dispatch(addAllUsers(allUsers))
            }


        } catch (e) {
            console.warn()
        }
        
    }, [ dispatch, token ])

    useEffect(() => {
        initUsers()
        
    }, [initUsers])
    

    const users = useSelector(state => state.users.allUsers)

    return (
        <div className="flex">
            <div className="usersPage">
                { !!users.length &&
                    <div className="searchUsersContainer">
                        { users.map( user => <User user={ user } key={ user.shortid } /> ) }
                    </div>
                }
            </div>
        </div>
    )
}