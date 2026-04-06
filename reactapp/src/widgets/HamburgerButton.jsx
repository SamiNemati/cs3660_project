
function HamburgerButton({targetId})
{
    return(
        <button 
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target={`#${targetId}`}
            aria-controls={targetId}
            aria-expanded="false"
            aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span>
        </button>

    );
}
 


export default HamburgerButton;