import {useNavigate} from 'react-router-dom'
import {apiSubmit} from '../assets/api'
import {useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
function Login()
{
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    async function submit_login(event){
        event.preventDefault();
        const data = new FormData(event.target);
        if (data.get('password') == data.get("confirmation"))
        {
            var response = await apiSubmit(event, "register");
            if(response == "err_db")
            {
                alert("This Username Already Exists! Try a differnt one")
            }
            else
            {
                alert("You Are Registered!")
                navigate("/login");
            }
        }
        else
        {
            alert("Passwords do not match!");
            return;
        }
        
        ////////////////////////login(response);/////////////////
        //navigate("/");
    }
    return (
        <>
            <form onSubmit={submit_login}>
                <h1>Sign Up</h1>
                <input name="firstname" required placeholder="First Name"/>
                <input name="lastname" required placeholder="Last Name" />
                <input name="username" required placeholder="Username" />
                <input name="password" type = "password" required placeholder="Password" />
                <input name="confirmation" type = "password" required placeholder="Confirm Password" />
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}
export default Login;
