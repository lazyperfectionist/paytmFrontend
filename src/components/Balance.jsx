import axios from "axios"
import { useEffect, useState } from "react";


function Balance(){
    const [balance,setbalance] = useState()
    async function fetchBalance(){
        const response = await axios.get('http://paytmbackend.shivanshdwivedi.in:3000/api/v1/account/balance',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        setbalance(response.data.balance)
    }
    useEffect(()=>{
        fetchBalance();
    },[])


    return (
        <>
        {balance}
        </>
    )
}

export default Balance;