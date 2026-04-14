import { useState, useRef } from 'react'
import {api, apiFilename} from '../assets/api'
import {EditContext} from '../contexts/EditContext.jsx'
import {useContext} from 'react'

function EditImage({dir, prefix, id, ext, route}) 
{
	const {editMode} = useContext(EditContext);

	const fileRef = useRef(null);
	const [waiting, setWaiting] = useState(false);
	const [extension, setExtension] = useState(ext);
	const src = apiFilename(dir, prefix, id, extension);

	const handleClick = (e) => {
		if (!waiting) fileRef.current.click(); 
		else alert("Uploading image ...");
	}

	const handleUpload = async (e) => {
		if (fileRef.current.files[0]) 
        {
			var data = new FormData();
			data.append("image_file", fileRef.current.files[0]);
			setWaiting(true);
			var response = await api(`${route}/image_file`, data, "PUT");
			setWaiting(false);
			if (response != "ok") alert(response);
			else {
				var filename = fileRef.current.files[0].name;
				var dotloc = filename.lastIndexOf(".");
				setExtension(filename.substring(dotloc + 1));
			}
		}
	}
	if (!editMode) return <img className="thumbnail" src={src} />;

	return (
		<>
			{ waiting ? 
				"Uploading ..." 
				:
				<div style={{position:"relative", cursor:"pointer"}} onClick={handleClick} >
					<img className="thumbnail" src={src} />
					<span style={{position: "absolute", right: "0px"}}><button style={{color: 'red'}}>&#9998;</button></span>
				</div>
			}
			<input 
				ref={fileRef} 
				type="file" 
				style={{display: "none"}} 
				accept=".gif, .jpg, .png, .jpeg"
				onChange={handleUpload}
			/>
		</>
	);
}
 
export default EditImage