import React, { useState, useEffect } from 'react';
import Balance from '../components/Balance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [tCount,setTCount] = useState(0)
    const [balance, setbalance] = useState()
    const [users, setUsers] = useState([]);
    const handleSendMoney = async (user) => {
        console.log(`Send money to user with ID: ${user}`);
        const response = await axios.post('paytmbackend.shivanshdwivedi.in:3000/api/v1/account/transfer', {
            to: user,
            amount: 100
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setTCount(tCount+1);
    };
    async function fetchBalance() {
        const response = await axios.get('paytmbackend.shivanshdwivedi.in:3000/api/v1/account/balance', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setbalance(response.data.balance)
    }

    useEffect(() => {
        fetchBalance();
    }, [tCount])
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin')
    };
    async function fetchAllUsers() {
        const users = await axios.get('paytmbackend.shivanshdwivedi.in:3000/api/v1/user/bulk', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(users.data);
        setUsers(users.data.user)
    }
    useEffect(() => {
        fetchAllUsers();
    }, [])
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Paytm App</h1>
                    <div className="flex items-center">
                        <span className="mr-4">{localStorage.getItem('username')}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold">Your Balance</h2>
                    <p className="text-lg">${balance}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Users</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.id} className="flex justify-between items-center mb-4 p-2 border-b border-gray-200 dark:border-gray-700">
                                <span>{user.firstName} - {user.lastName}  --  {user.username}</span>
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                                    onClick={() => handleSendMoney(user.userId)}
                                >
                                    Send Money
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
