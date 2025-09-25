import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewFarmers() {
    const [farmers, setFarmers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const displayFarmers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.url}/admin/viewallfarmers`);
            setFarmers(response.data);
        } catch (err) {
            setError("Failed to fetch farmers data ... " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        displayFarmers();
    }, []);

    const deleteFarmer = async (fid) => {
        try {
            const response = await axios.delete(`${config.url}/admin/deletefarmer?fid=${fid}`);
            toast.success(response.data);
            displayFarmers();
        } catch (err) {
            setError("Unexpected Error Occurred... " + err.message);
            toast.error("Deletion failed: " + err.message);
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
                background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                borderBottom: "3px solid #27ae60",
                display: "inline-block",
                width: "100%"
            }}>
                Farmer Management
            </h3>

            <ToastContainer position="top-center" autoClose={4000} />

            {error ? (
                <div className="table-error">{error}</div>
            ) : loading ? (
                <div className="table-loading">Loading farmers data...</div>
            ) : farmers.length === 0 ? (
                <div className="table-empty">No Farmers Data Found</div>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {farmers.map((farmer) => (
                            <tr key={farmer.id}>
                                <td>{farmer.id}</td>
                                <td>{farmer.name}</td>
                                <td>{farmer.gender}</td>
                                <td>{farmer.dob}</td>
                                <td>{farmer.email}</td>
                                <td>{farmer.username}</td>
                                <td>{farmer.mobileno}</td>
                                <td>
                                    <button
                                        className="table-action-btn delete"
                                        onClick={() => deleteFarmer(farmer.id)}
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
