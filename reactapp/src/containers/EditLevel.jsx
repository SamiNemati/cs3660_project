import {apiSubmit} from '../assets/api'
function EditLevel({id, refresh=false})
{
    const updateLevel = async (level) => {
        event.preventDefault();
        var formdata = new FormData();
        formdata.append("value", level)
        var r = await apiSubmit(event, `user/${id}/level`, "PATCH", formdata);
        alert(r);
    }
 
    return (
        <>
            {" "}
            <button style={{backgroundColor: `rgb(${189}, ${137}, ${235})`, 
                            borderRadius: '8px', 
                            borderColor: `rgb(${189}, ${137}, ${235})`}} 
                            onClick={()=>updateLevel(1)}>
                Level 1
            </button>
            {" "}
            <button style={{backgroundColor: `rgb(${189}, ${137}, ${235})`, 
                            borderRadius: '8px', 
                            borderColor: `rgb(${189}, ${137}, ${235})`}}  
                            onClick={()=>updateLevel(2)}>
                Level 2
            </button>
            {" "}
            <button style={{backgroundColor: `rgb(${189}, ${137}, ${235})`, 
                            borderRadius: '8px', 
                            borderColor: `rgb(${189}, ${137}, ${235})`}}  
                            onClick={()=>updateLevel(3)}>
                Level 3
            </button>
        </>
    );
}
export default EditLevel;