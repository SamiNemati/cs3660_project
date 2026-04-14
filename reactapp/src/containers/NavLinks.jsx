import {Link, NavLink} from 'react-router-dom'
import userLinks from '../assets/nav.json'
import {useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import AccessRequired from './AccessRequired'
import {EditContext} from '../contexts/EditContext.jsx'
function NavLinks({targetId})
{
    const {logout, level} = useContext(AuthContext);
    const {editMode, toggleEditMode} = useContext(EditContext);
    var navLinks = userLinks;
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
                    <AccessRequired minLevel="3">
                        <Link className="nav-link" to="/admin">Admin</Link>
                    </AccessRequired>
                    <AccessRequired minLevel="2">
                        <button className="editModeButton" onClick={toggleEditMode}>
                            {editMode ? " View Mode " : " Edit Mode "}
                        </button>
                    </AccessRequired>
                    <AccessRequired minLevel="1">
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                    </AccessRequired>
                    <AccessRequired minLevel="3">
                        <NavLink className="nav-link" to="/users">Manage Users</NavLink>
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