import {useState, useRef} from 'react'
function ImageUpload()
{
    const [file, setFile] = useState(null);
    const fileInput = useRef();
    return (
        <>
            <button type="button" onClick={()=>fileInput.current.click()}>
                {file ? <img src={URL.createObjectURL(file)} style={{width: '200px'}} />
                    :
                    "Add Photo"
                }
            </button>
            <input ref={fileInput} style={{display: 'none'}}
                name= "image_file" type="file" 
                accept=".gif, .png, .jpg, .jpeg" required 
                onChange={()=>setFile(fileInput.current.files[0])} 
            />
        </>
    );
}
export default ImageUpload;