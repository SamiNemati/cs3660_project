import {useState, useEffect} from 'react'
import EditProfile from '../containers/EditProfile'
import {useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext';
import {apiJSON } from '../assets/api'

function TransactionHistory({user})
{
    const [transactions, setTransactionH] = useState([]);
    const [position, setPosition] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    var toPosition = 5;
    const getHistory = async (id, limitstart) =>{
        const route = `/transactions/user/${id}?limitstart=${limitstart}`;
        var result = await apiJSON(route);
        if(result && result.length > 0){setTotalTransactions(result[0]["transactioncount"]);}
        setTransactionH(result);
        setTotalTransactions(result[0].transactioncount);
        console.log(result);
        //return result;
    }
    const updatePosition = async (num) =>{
        var newPosition = position + num;
        if (!newPosition < 0 || newPosition >= totalTransactions)
        {
            return;
        }
        setPosition(newPosition);
        await getHistory(user.id, newPosition);
    }

    useEffect(()=> {getHistory(user.id, 0); setPosition(0);},[]);
    return (
        <>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>Transaction History</h2>
            <h4 style={{display: 'flex', justifyContent: 'center'}}>Transaction {position+5 < totalTransactions ? `${position} to ${position+5} Out of ${totalTransactions}`: `${position} to ${totalTransactions}`}</h4>
            <div className="navigation">
                {totalTransactions > 5 ?
                    <>
                        <div className="navigationItem" style={{cursor:"pointer", color: 'green'}}
                            onClick={()=>{updatePosition(-5);}}>Previous</div> 
                        <div className="navigationItem" style={{cursor:"pointer", color: 'green'}}
                            onClick={()=>{updatePosition(5);}}>Next</div> 
                    </>
                    : ""
                }
            </div>
            
            <div className="transactionHistory">
                {user.level >=1 && transactions.length > 0 ? 
                    <>
                        {transactions.map((transaction, i) => (
                            <div className="transactionItem">
                                <h3 key={i}>Transaction {transaction.id}</h3>
                                <div >Date: {transaction.date}</div>
                                <div>Amount: {transaction.amount}</div>
                                <div>Payment Type: {transaction.paymenttype}</div>
                                <div>Payment Number: {transaction.paymentnumber}</div>
                                <br/>
                            </div>
                        ))}
                    </>
                    : "No transactions."
                }
            </div>
        </>
        
    );
}

export default TransactionHistory;

    
