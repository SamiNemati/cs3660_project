import navLinks from '../assets/nav.json'
import {NavLink} from 'react-router-dom'
import HamburgerButton from '../widgets/HamburgerButton.jsx'
import NavLinks from '../containers/NavLinks.jsx'
function Nav({user})
{
    const targetId = "elementid";
    return(
        
        <div className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img className= "logo" src = "images/simpleGamesLogo.png" alt="Logo"/>
                    Simple Games</a>
                <HamburgerButton targetId = {targetId}/>
                <NavLinks targetId = {targetId} user={user}/>
            </div>
        </div>
    );
}



export default Nav; 

