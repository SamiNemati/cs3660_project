import { database_command } from '../assets/api'
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
            </div>
        </>
    );
}
export default Admin;

	