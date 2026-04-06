import {useState, useEffect} from 'react'
import {apiJSON, apiFilename} from '../assets/api'
function ProfessionalsList()
{
    
    const[professionals, setProfessionals] = useState([]);
    const getProfessionals = async() =>{
        const professionals = await apiJSON("/professionals");
        setProfessionals(professionals);
    }
    
    //setProfessionals(professional_s);
    useEffect(()=> {getProfessionals();},[]);
    return(
        <div className="devImgContainer">
            {professionals.map(professional =>
                <div className="devImg" key={professional["id"]}>
                    {professional["name"]}
                    <br />
                    <img className="thumbnail" 
                        src = {apiFilename("professionals", 
                                            "professional",
                                            professional["id"],
                                            professional["image_ext"]  )
                        }
                    />
                </div>
            )}
        </div>
    )
}
export default ProfessionalsList;