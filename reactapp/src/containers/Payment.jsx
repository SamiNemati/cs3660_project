import {useState, useRef} from 'react'
import {apiSubmit} from '../assets/api'
import {useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext';

function Payment({refresh})
{
    const [orderId, setOrderId] = useState(null);
    const [amount, setAmount] = useState("");
    const {user} = useContext(AuthContext);

    const getOrderId = async (event) =>{
        event.preventDefault();

        const formData = new FormData(event.target);
        const amountValue = formData.get("amount");

        const result = await apiSubmit(event, `order/${user.id}`);
        const data = JSON.parse(result);
        console.log(data);
        if(data)
        {
            //console.log(data["orderid"]);
            setOrderId(data.orderid);
            //console.log(orderId);
            setAmount(amountValue);
        }
        else
        {
            alert("Failed." + data);
        }
    }

    const cancel = () =>{
        setOrderId(null);
        setAmount("");
    }

    const sendCapture = async (event) => {
        event.preventDefault();

        //const formData = new FormData(event.target);
        //formData.append("amount", amount);
        //console.log(orderId);
        const data = await apiSubmit(event, `capture/${user.id}/${orderId}`);
        const result = JSON.parse(data);
        console.log(result);
        if(result.status == "COMPLETED")
        {
            setOrderId(0);
            setAmount(0);
            alert("Payment send!");
            if(refresh){
                refresh();
            }
        }
        else
        {
            console.log(result);
            alert("Payment failed! " + result);
        }
    }

    return (
        <>
            {orderId == null ? 
                <form method="POST" onSubmit={getOrderId} style={{width: '300px', margin: '1% auto'}}>
                    <h3>Debt</h3>
                    <div>
                        <input name="amount" type="number" step="any" placeholder='Amount' required />
                    </div>
                    <div>
                        <button type="button" onClick={cancel}>Cancel</button>
                        <button type="submit"> Pay </button>
                    </div>
                </form>
                :
                <>
                    <h2 style={{display: 'flex', padding: '20px', justifyContent: 'center'}}>Amount: ${amount}</h2>
                    <form method="POST" onSubmit={sendCapture} style={{width: '300px', margin: '1% auto', padding: '40px'}}>
                        <h3>Card Information</h3>
                        <input type="hidden" name="amount" value={amount} />
                        <div><input name="name" placeholder='Name' required /></div>
                        <div><input name="number" placeholder='Card Number' required /></div>
                        <div><input name="expiry" placeholder='Expiration Date' required /></div>
                        <div><input name="securitycode" placeholder='Security Code' required /></div>
                        <h4>Address</h4>
                        <div><input name="street" placeholder='Street' required /></div>
                        <div><input name="city" placeholder='City' required /></div>
                        <div><input name="state" placeholder='State' required /></div>
                        <div><input name="postalcode" placeholder='Postal Code' required /></div>
                        <div>
                            <button onClick={cancel}>Cancel</button>
                            <button type="submit"> Pay </button>
                        </div>
                    </form> 
                </>}
        </>
    );
}

export default Payment;
