import {NavLink} from 'react-router-dom'
import userLinks from '../assets/nav.json'
import adminLinks from '../assets/navAdmin.json'
function NavLinks({targetId, user})
{
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
                </ul>
            </div>
        </>
    );
}
 


export default NavLinks; 