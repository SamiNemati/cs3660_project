import {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'

function AccessRequired({children, minLevel, redirect})
{
    const {level} = useContext(AuthContext);
    if(level() >= minLevel ) 
    {
        return children;
    }
    else if(redirect) 
    {
        return <Navigate to={redirect}/>;
    }
    else 
    {
        return <></>;
    }
}
export default AccessRequired;