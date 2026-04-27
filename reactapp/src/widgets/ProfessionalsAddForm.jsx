import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import ImageUpload from './ImageUpload.jsx'
import {EditContext} from '../contexts/EditContext.jsx'
import { useContext } from 'react'
function ProfessionalsAddForm({handleSubmit})
{
    const nameInput = useRef();
    const {editMode} = useContext(EditContext);
    return (
        <>
            {editMode ? 
                <form method="POST"  encType="multipart/form-data" onSubmit={handleSubmit} style={{width: '300px', margin: '1% auto', padding: '40px'}}>
                    <h3>Add a Professional</h3>
                    <div>
                        Name<br /> <input ref={nameInput} name="name" required />
                    </div>
                    <div style={{padding: '5px 0px 20px'}}>
                        <ImageUpload />
                    </div>
                    
                    <div>
                        <button><Link to="/admin">Cancel</Link></button>
                        <button type="submit"> Submit </button>
                    </div>
                </form>
                : ""
            }
        </>
    );
}
export default ProfessionalsAddForm;