import {useState} from 'react'
import ProfessionalsList from '../containers/ProfessionalsList'
import { apiForm } from '../assets/api'
import ProfessionalsAddForm from '../widgets/ProfessionalsAddForm'

function Professionals() 
{
	const [hide, setHide] = useState(false);
	const handleSubmit = async (event)=>{
		setHide(true);
		await apiForm(event, "professionals");
		setHide(false);
	};

	return (
		<>
			<h1 style={{textAlign: 'center'}}>Development Team</h1>
			{hide ? 
				"Refreshing ... " 
				: 
				<>
					<ProfessionalsList />
					<ProfessionalsAddForm handleSubmit={handleSubmit} />
				</>
			}			
		</>
	);
} 

export default Professionals;