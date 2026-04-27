import {apiSubmit} from '../assets/api'
function Contact()
{
    async function submit_message(event) 
    {
        event.preventDefault();
        var form = event.target;
        var headers = {"method":"POST","body":new FormData(form)};
        form.disabled=true;
        var response = await apiSubmit(event, "contact")
        if(response != "ok")
        {
            alert(`Failed: ${response}`)
        }
        else
        {
            alert("Message Sent!")
        }
        form.disabled=false;
    }
    return (
        <>
            <form style={{margin: '50px'}} method="POST" onSubmit={submit_message} >
                <h2>Contact Form</h2>
                <div>
                    <input type="text" id="subject" name="subject" placeholder="Subject"></input>
                </div>
                <div>
                    <textarea id="message" name="message" placeholder="Message" style={{width: '400px', height: '150px'}}></textarea>
                </div>
                <button type="submit">Submit</button>
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