import {useRef} from 'react'
import {apiSubmit} from '../assets/api'

function EditPassword({id, level})
{
    const passwordRef = useRef();
    const confirmationRef = useRef();

    const updatePassword = async (event) =>{
        event.preventDefault();
        if(passwordRef.current.value != confirmationRef.current.value)
            return alert("Error: Password must Match!");
        var r = await apiSubmit(event, `user/${id}/password`, "PATCH");
        alert(r);
    };

    return (
        <form onSubmit={updatePassword}>
            <div style={{textAlign: 'center'}}>
                <h2>Change Password</h2>
                {level < 3 ? <>
                    <input type="password" name="oldpassword" placeholder="Old Password"/>
                </> : ""}
                <br />
                <input  type="password" ref={passwordRef} name="newpassword" placeholder="New Password"/>
                <br />
                <input type="password" ref={confirmationRef} placeholder="Confirm Password"/>
                <br />
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}
export default EditPassword;