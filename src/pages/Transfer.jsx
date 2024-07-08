import React, { useState } from "react";
import axios from "axios";

function TransferMoney({ onTransactionComplete }) {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleTransfer() {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await axios.post('http://paytmbackend.shivanshdwivedi.in:3000/api/v1/account/transfer', {
                recipient,
                amount
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuccess("Transfer successful!");
            onTransactionComplete();
        } catch (error) {
            setError("Transfer failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Transfer Money</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Recipient</label>
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter recipient"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter amount"
                />
            </div>
            <button
                onClick={handleTransfer}
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
                {loading ? "Processing..." : "Transfer"}
            </button>
        </div>
    );
}

export default TransferMoney;
