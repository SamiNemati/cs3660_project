import ServicesList from "../containers/ServicesList.jsx"
import {useState} from 'react'
import ServicesAddCategoryForm from '../widgets/ServicesAddCategoryForm.jsx'
import {add} from '../assets/api'
function Services()
{
    const[pause, setPause] = useState(false);
    const handleSubmit = async(event) =>
    {
        setPause(true);
        var response = await add(event, "/services_add_category");
        setPause(false);
        if (!response ) alert(response);
    }
    if(pause) return "Refreshing..."
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Services</h1>
            <div> <ServicesAddCategoryForm handleSubmit = {handleSubmit}/> </div>
            <div className="serviceContainer">
                <ServicesList />
            </div>

            
        </>
    );
}
export default Services;