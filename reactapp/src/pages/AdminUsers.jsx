import {useState, useEffect} from 'react'
import EditProfile from '../containers/EditProfile'
import {apiJSON, api} from '../assets/api'
import {useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import DeleteButton from '../containers/DeleteButton'
import EditLevel from '../containers/EditLevel'
function AdminUsers()
{
    const[users, setUsers] = useState(null);
    const getUsers = async () => setUsers(await apiJSON("/users"));
    useEffect(()=>{
        getUsers();
    }, []);

    if(users) console.log(Object.values(users));
    return (
        <div className="userProfile">
            {users ? Object.values(users).map(
                (user, i) =>
                    <div key={i} className="user">
                        <DeleteButton 
                            route={`user/${user["id"]}`} 
                            after={getUsers} always={true}
                        />
                        <div className="editProfile">
                            <EditProfile id={user.id} user = {user} refresh={getUsers}/>
                        </div>
                        <EditLevel id={user.id} refresh={getUsers} />
                    </div>
            ) : "Loading ..."}
        </div>
    );
}

export default AdminUsers;