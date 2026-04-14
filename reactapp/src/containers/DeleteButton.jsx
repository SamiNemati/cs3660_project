import {api} from "../assets/api.js"
import {EditContext} from '../contexts/EditContext.jsx'
import {useContext} from 'react'

function DeleteButton({route, always = false, after = null}) 
{
	const {editMode} = useContext(EditContext);
	const handleClick = async (e) => {
		var response = await api(route, null, "DELETE");
		if (response != "ok") alert(response);
		if (after) after();
	}
	if (!editMode && !always) return "";

	return (
		<span   style={{cursor:"pointer", fontWeight: 'bold', color: 'red'}} onClick={handleClick}
			>X  
		</span>
	);
}

export default DeleteButton;