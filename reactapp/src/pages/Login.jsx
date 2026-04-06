import {useNavigate} from 'react-router-dom'
import {apiSubmit} from '../assets/api'
import {useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
function Login()
{
    const {login, level} = useContext(AuthContext);
    const navigate = useNavigate();
    async function submit_login(event){
        event.preventDefault();
        var response = await apiSubmit(event, "login");
        let user = login(response);
        if(user)
        {
            if (user.level > 1)
            {
                navigate("/admin");
            }
            else if (user.level == 1)
            {
                navigate("/");
            }
        }
    }
    return (
        <>
            <form onSubmit={submit_login}>
                <h1>Log In</h1>
                <input name="username" required placeholder="Username"/>
                <input name="password" type = "password" required placeholder="Password" />
                <button type="submit">Log In</button>
            </form>
        </>
    )
}
export default Login;
