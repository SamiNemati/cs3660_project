import {Link} from 'react-router-dom'

function ServicesAddForm({handleSubmit, categoryId})
{
    return(
        <>
            <form method="POST" onSubmit={handleSubmit}>
                <hr />
                <h3 style={{textAlign: 'center'}}>Add Service</h3>
                <p>
                    Name<br / > <input name="name"  required />
                </p>
                <p>
                    <input type="hidden" name="id" value={categoryId} />
                </p>
                <p>
                    <button><Link to="/admin">Cancel</Link></button>
                    <button type="submit"> Submit </button>
                </p>
            </form>
        </>
    )
} 

export default ServicesAddForm;