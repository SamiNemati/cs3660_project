import {useState, useEffect} from 'react'
import {apiJSON, apiFilename, add } from '../assets/api'
import ServicesAddForm from '../widgets/ServicesAddForm.jsx'
import { EditContext } from "../contexts/EditContext.jsx";
import {useContext} from 'react'
import DeleteButton from './DeleteButton'
import EditText from './EditText'
import EditImage from './EditImage'
function ServicesList()
{
    const {editMode} = useContext(EditContext);
    const[categories, setServices] = useState([]);
    const getServices = async ()=> {
        const categories = await apiJSON("/services");
        setServices(categories);
        console.log(categories);
    }
    const handleSubmit = async(event) =>
    {
        //setPause(true);
        var response = await add(event, "/services");
        //setPause(false);
        getServices();
    }
    //if(pause) return "Refreshing..."
    useEffect(()=> {getServices();},[]);
    return(
        <>
            <div className="services">
                {categories.map(category =>
                    <div className="serviceItem" key={category["id"]}>
                        <DeleteButton route={`service_category/${category["id"]}`} after={getServices} />
                        <EditText name="name" route={`service_category/${category["id"]}`}>
							{category["name"]}
						</EditText> 
                        <EditImage
							id={category["id"]}
							ext={category["image_ext"]}
							dir="services"
							prefix="service"
							route={`service_category/${category["id"]}`}
						/>
                        {category.services.map((service, i) =>(
                            <div key = {i}>
                                <DeleteButton route={`service/${service["id"]}`} after={getServices} />
                                <p>{service.name}</p>
                            </div>
                        ))}
                        {editMode ? (<ServicesAddForm handleSubmit = {handleSubmit} categoryId = {category["id"]} />) : ("")}
                    </div>
                )}
            </div>
        </>

    );
} 

export default ServicesList;
