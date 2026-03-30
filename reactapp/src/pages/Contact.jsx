function Contact()
{
    return (
        <>
            <div>
                <h2>Contact Form</h2>
            </div>
            <div>
                <label htmlFor="name">Name: </label>
		        <input type="text" id="name" name="name" style={{width: '200px'}} ></input>
            </div>
            <div>
                <label htmlFor="subject">Subject: </label>
		        <input type="text" id="subject" subject="subject" style={{width: '250px'}}></input>
            </div>
            <div>
                <label htmlFor="message">Message: </label>
		        <input type="text" id="message" message="message" style={{width: '800px'}}></input>
            </div>
            <br />
            <h2>Contact me Directly</h2>
            Sami Nemati
            <br />
            saminematinum7@gmail.com
            
        </>
    );
}
export default Contact;