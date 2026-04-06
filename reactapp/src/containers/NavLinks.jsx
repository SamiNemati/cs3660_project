import {Link, NavLink} from 'react-router-dom'
import userLinks from '../assets/nav.json'
import adminLinks from '../assets/navAdmin.json'
import {useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import AccessRequired from './AccessRequired'
function NavLinks({targetId, user})
{
    const {logout, level} = useContext(AuthContext);
    var navLinks =[];
    {user == "client" ? navLinks = userLinks : navLinks = adminLinks }
    return(
        <>
            
            <div className="collapse navbar-collapse" id={targetId}>
                <ul className="navbar-nav">
                    {navLinks.map((item, i) => 
                        <li className="nav-item" key={i}>
                            <NavLink  className="nav-link" to={ item.link }>
                                { item.name }
                            </NavLink>
                        </li>
                    )}
                    <AccessRequired minLevel="2">
                        <Link className="nav-link" to="/admin">Admin</Link>
                    </AccessRequired>
                    {level() ?
                         <Link className="nav-link" to="/home" onClick={logout}>Sign Out</Link>
                        : (<><NavLink className="nav-link" to="/Login">Sign In</NavLink> <NavLink className="nav-link" to="/register">Sign Up</NavLink> </>)
                    }
                    
                </ul>
            </div>
        </>
    );
}
 


export default NavLinks; 