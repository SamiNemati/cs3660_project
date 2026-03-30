import ServicesList from "../containers/ServicesList.jsx"
function Services()
{
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Services</h1>
            <div className="serviceContainer">
                <ServicesList showForm = {false} />
            </div>
            
        </>
    );
}
export default Services;