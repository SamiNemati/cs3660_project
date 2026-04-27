import { useState, useEffect } from 'react'
import {api} from '../assets/api'
import {EditContext} from '../contexts/EditContext.jsx'
import {useContext} from 'react'

function EditText({children, type="text", name, route, always, after, field = null}) 
{
	const {editMode} = useContext(EditContext);
	const [editing, setEditing] = useState(false);
	const [waiting, setWaiting] = useState(false);
	const [value, setValue] = useState(children);

	useEffect(()=>{
		setValue(children);
	}, [children]);
	const handleKey = (event) => {
		if (event.key === "Escape") 
		{
			setEditing(false);
			setValue(children);
		}
		else if (event.key === "Enter")
		{
			event.preventDefault();
			handleSave(event);
		}
	}
	const handleSave = async (event) => {
		setWaiting(true);
		var data = new FormData();
		data.append("value", value);
		event.target.disabled = true;
		if (value == children) var response = "ok"; 
		else var response = await api(`${route}/${name}`, data, "PATCH");
		event.target.disabled = false;
		setWaiting(false);
		setEditing(false);
		//console.log(value);
		if (response == "ok") 
		{
			setValue(value);
			//console.log(value);
			if (after) after(field, value);
		}
		else { alert(response); setValue(children);}
	};

	if (!editMode && !always) 
	{
		return value;
	}
 
	return editing ? 
		<>
			<input 
				name="value" 
				type={type}
				value={value} 
				onChange={(e) => setValue(e.target.value)} 
				onKeyDown={handleKey}
			/>
		</>
		:
		<span>
			{value}
			{waiting?
				"" : <div style={{cursor:"pointer", color: 'red'}} onClick={()=>setEditing(true)} onKeyDown={handleKey}>&#9998;</div>
			}
		</span>
	;
}
export default EditText;