import {useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import EditPassword from './EditPassword'
import EditText from '../containers/EditText'
function EditProfile({id, user, refresh=null})
{
    const {authUpdateField} = useContext(AuthContext);
    const after = (field, value) => {
        authUpdateField(field, value);
        if(refresh) refresh();
    }
    const {level} = useContext(AuthContext);
    return (
        <>
            <div className="editProfile">
                <h2 style={{textAlign: 'center'}}>User Profile {user.username}</h2>
                    <h3 style={{width: '100%', backgroundColor: `rgb(${189}, ${137}, ${235})`, textAlign: 'center'}}>First name</h3>
                    <EditText name="firstname" 
                            route={`user/${id}`} always={true} 
                            field = {"firstname"} after = {after}>
                        {user.firstname}
                    </EditText>
                    <h3 style={{width: '100%', backgroundColor: `rgb(${189}, ${137}, ${235})`, textAlign: 'center'}}>Last name</h3>
                    <EditText name="lastname" 
                            route={`user/${id}`} always={true} 
                            field = {"lastname"} after = {after}>
                        {user.lastname}
                    </EditText>
                    <h3 style={{width: '100%', backgroundColor: `rgb(${189}, ${137}, ${235})`, textAlign: 'center'}}>Username</h3>
                    <EditText name="username" 
                            route={`user/${id}`} always={true} 
                            field = {"username"} after = {after}>
                        {user.username}
                    </EditText>
                    
                <EditPassword id={id} level={level()} />
            </div>
        </>
    );
}

export default EditProfile;