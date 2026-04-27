import {useState, useEffect} from 'react'
import {apiJSON, apiFilename} from '../assets/api'
import DeleteButton from './DeleteButton'
import EditText from './EditText'
import EditImage from './EditImage'
function ProfessionalsList()
{
    
    const[professionals, setProfessionals] = useState([]);
    const getProfessionals = async() =>{
        const professionals = await apiJSON("/professionals");
        setProfessionals(professionals);
    }
    useEffect(()=> {getProfessionals();},[]);
    return(
        <div className="devImgContainer">
            {professionals.map(professional =>
                <div className="devImg" key={professional["id"]}>
                    
                    <DeleteButton 
                        route={`professional/${professional["id"]}`} 
                        after={getProfessionals} 
                    />
                    <EditText name="name" 
                            route={`professional/${professional["id"]}`}>
                        {professional["name"]}
                    </EditText>
                    <br />
                    <EditImage  dir="professionals"
                                prefix="professional"
                                id={professional["id"]}
							    ext={professional["image_ext"]}
							    route={`professional/${professional["id"]}`}
					/>
                </div>
            )}
        </div>
    )
}
export default ProfessionalsList;
