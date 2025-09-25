import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ViewBuyers() {
    const [buyers, setBuyers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const displayBuyers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.url}/admin/viewallbuyers`);
            setBuyers(response.data);
        } catch (err) {
            setError("Failed to fetch buyers data ... " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        displayBuyers();
    }, []);

    const deleteBuyer = async (bid) => {
        try {
            const response = await axios.delete(`${config.url}/admin/deletebuyer?bid=${bid}`);
            alert(response.data);
            displayBuyers();
        } catch (err) {
            setError("Unexpected Error Occurred... " + err.message);
        }
    };

    return (
        <div className="data-table-container">
            <h3 style={{
                textAlign: "center",
                color: "#2c3e50",
                fontWeight: "700",
                marginBottom: "2rem",
                fontSize: "2rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: "1rem",
                background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                borderBottom: "3px solid #3498db",
                display: "inline-block",
                width: "100%"
            }}>
                Buyer Management
            </h3>

            {error ? (
                <div className="table-error">{error}</div>
            ) : loading ? (
                <div className="table-loading">Loading buyers data...</div>
            ) : buyers.length === 0 ? (
                <div className="table-empty">No Buyer Data Found</div>
            ) : (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Mobile No</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyers.map((buyer) => (
                            <tr key={buyer.id}>
                                <td>{buyer.id}</td>
                                <td>{buyer.name}</td>
                                <td>{buyer.gender}</td>
                                <td>{buyer.dob}</td>
                                <td>{buyer.email}</td>
                                <td>{buyer.username}</td>
                                <td>{buyer.mobileno}</td>
                                <td>{buyer.location}</td>
                                <td>
                                    <button
                                        className="table-action-btn delete"
                                        onClick={() => deleteBuyer(buyer.id)}
                                    >
                                        <DeleteIcon /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}