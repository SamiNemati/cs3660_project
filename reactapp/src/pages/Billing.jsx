import {useState, useEffect} from 'react'
import EditProfile from '../containers/EditProfile'
import {useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext';
import Payment from '../containers/Payment'
import TransactionHistory from '../containers/TransactionHistory'
import {api, apiJSON} from '../assets/api'

function Billing()
{
    const [balance, setBalance] = useState(0);
    const {user, updateAuth} = useContext(AuthContext);
    const refresh = () => {
        updateAuth();
    }
    const id = user.id;
    if(!user) return "Refreshing..."
    const getBalance = async (id) =>{
        //console.log(id);
        const route = `/balance/user/${id}`;
        const result = await apiJSON(route);
        setBalance(result["balance"]);
    }

    useEffect(()=> {getBalance(user.id);},[]);
    //console.log(balance);
    return (
        <>
            <h2 style={{display: 'flex', justifyContent: 'center', padding: '40px'}}>Balance</h2>
            {user.level >=1 ? 
                <div style={{display: 'flex', justifyContent: 'center'}}>Current Balance: ${parseFloat(balance.toFixed(2)).toLocaleString()}</div> : ""
            }
            {balance < 0 ? 
                <Payment refresh={refresh}/> : ""
            }
            <TransactionHistory user={user}/>
            {user.level > 1 ? 
                "" : ""
            }
        </>
    );
}

export default Billing;

    
