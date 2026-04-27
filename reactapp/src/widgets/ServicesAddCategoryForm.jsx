import {Link} from 'react-router-dom'
import ImageUpload from './ImageUpload.jsx'
import { EditContext } from "../contexts/EditContext.jsx";
import {useContext} from 'react'
function ServicesAddCategoryForm({handleSubmit})
{
    const {editMode} = useContext(EditContext)
    if (!editMode) return "";
    return (
        <>
            <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit} style={{width: '300px', margin: '2% auto', padding: '40px'}}>
                <h3>Add New Category</h3>
                <p>
                    Name<br /> <input name="name" required />
                </p>
                <div style={{padding: '5px 0px 20px'}}>
                    <ImageUpload />
                </div>
                <p>
                    <button> <Link to="/admin">Cancel</Link></button>
                    <button type="submit"> Submit </button>
                </p>
            </form>
        </>
    );
} 
export default ServicesAddCategoryForm;





