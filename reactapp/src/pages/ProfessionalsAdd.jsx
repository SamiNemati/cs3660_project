import {useState} from 'react'
//import {Link} from 'react-router-dom'
import ProfessionalsList from "../containers/ProfessionalsList.jsx"
import {add} from '../assets/api'
import ProfessionalsAddForm from '../widgets/ProfessionalsAddForm.jsx'
function ProfessionalsAdd()
{
    const[pause, setPause] = useState(false);
    const handleSubmit = async(event) =>
    {
        setPause(true);
        var response = await add(event, "/professionals_add");
        setPause(false);
    }
    if(pause) return "Refreshing..."
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Developent Team</h1>
            <div className="devImgContainer">
                <ProfessionalsList />
            </div>

            <ProfessionalsAddForm handleSubmit = {handleSubmit} />
        </>
    );
}
export default ProfessionalsAdd; 