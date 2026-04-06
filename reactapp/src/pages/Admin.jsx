import { database_command } from '../assets/api'
import {Link} from 'react-router-dom'
import AccessRequired from '../containers/AccessRequired';
function Admin()
{
    return (
        <>
            <div id="adminAlert"></div>
            <div className="adminContainer">
                <AccessRequired minLevel="3">
                    <div className = "adminItem" onClick={()=> database_command('backup')} >
                        <button style = {{width: '250px'}}>Backup Data</button>
                    </div>
                    <div className = "adminItem" onClick={()=> database_command('restore')}>
                        <button style = {{width: '250px'}}>Restore Data</button>
                    </div>
                </AccessRequired>
        
                <div className = "adminItem">
                    <button style = {{width: '250px'}}><Link to="/professionals_add">Add Professional</Link></button>
                </div>
                <div className = "adminItem">
                    <button style = {{width: '250px'}}><Link to="/services_add">Add Service Category</Link> </button>
                </div>
                <div className = "adminItem">
                    <button style = {{width: '250px'}}><Link to="/services_add">Add Service</Link></button>
                </div>
            </div>
        </>
    );
}
export default Admin;

	