import {useState} from 'react'
//import {Link} from 'react-router-dom'
import ServicesList from "../containers/ServicesList.jsx"
import {add} from '../assets/api'
import ServicesAddCategoryForm from '../widgets/ServicesAddCategoryForm.jsx'
function ServicesAdd()
{
    const[pause, setPause] = useState(false);
    const handleSubmit = async(event) =>
    {
        setPause(true);
        var response = await add(event, "/services_add_category");
        setPause(false);
    }
    if(pause) return "Refreshing..."
    return (
        <>
            <h1 style ={{textAlign: 'center'}}>Add Services</h1>
            <div> <ServicesAddCategoryForm handleSubmit = {handleSubmit}/> </div>
            <div>
                <ServicesList showForm />
            </div>
        </>
    );
}
export default ServicesAdd;





