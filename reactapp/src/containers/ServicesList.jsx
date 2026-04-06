import {useState, useEffect} from 'react'
import {apiJSON, apiFilename, add } from '../assets/api'
import ServicesAddForm from '../widgets/ServicesAddForm.jsx'
function ServicesList({showForm})
{
    //const[pause, setPause] = useState(false);
    const[categories, setServices] = useState([]);
    const getServices = async ()=> {
        const categories = await apiJSON("/services");
        setServices(categories);
    }
    const handleSubmit = async(event) =>
    {
        //setPause(true);
        var response = await add(event, "/services_add");
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
                        <h2 style={{textAlign: 'center'}}>{category["name"]}</h2>
                        <img src = {apiFilename("services", 
                                                "service", 
                                                category["id"],
                                                category["image_ext"])
                                    }
                        />
                        {category.services.map((service, i) =>(
                            <p key={i}>{service.name}</p>
                        ))}
                        {showForm ? (<ServicesAddForm handleSubmit = {handleSubmit} categoryId = {category["id"]} />) : ("")}
                    </div>
                )}
            </div>
        </>

    )
}

export default ServicesList;