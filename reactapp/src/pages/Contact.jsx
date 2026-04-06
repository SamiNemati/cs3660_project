function Contact()
{
    return (
        <>
            <form style={{margin: '50px'}}>
                <h2>Contact Form</h2>
                <div>
                    <input type="text" id="name" name="name" placeholder="Name" ></input>
                </div>
                <div>
                    <input type="text" id="subject" subject="subject" placeholder="Subject"></input>
                </div>
                <div>
                    <textarea id="message" message="message" placeholder="Message" style={{width: '400px', height: '150px'}}></textarea>
                </div>
            </form>
            <br />
            <div style= {{textAlign: 'center', verticalAlign: 'center'}}>
                <h2>Contact me Directly</h2>
                Sami Nemati
                <br />
                saminematinum7@gmail.com
            </div>
            
            
        </>
    );
}
export default Contact;