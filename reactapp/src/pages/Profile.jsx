import {useState, useEffect} from 'react'
import EditProfile from '../containers/EditProfile'
import {useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext';

function Profile()
{
    const {user, updateAuth} = useContext(AuthContext);
    const refresh = () => {
        updateAuth();
    }
    if(!user) return "Refreshing..."
    return (
        <div className="userProfile">
            <div className="user">
                <EditProfile id={user.id} user ={user} refresh={refresh}/>
            </div>
        </div>
    );
}

export default Profile;

    
