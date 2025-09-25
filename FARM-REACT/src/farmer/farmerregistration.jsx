import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Alert,
    Snackbar,
} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PhoneIcon from "@mui/icons-material/Phone";

export default function FarmerRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.url}/farmer/registration-request`, formData);
            setSnackbar({
                open: true,
                message: "Registration request submitted successfully! Admin will contact you soon.",
                severity: "success",
            });
            setFormData({
                name: "",
                email: "",
                mobile: "",
                message: "",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Failed to submit registration request. Please try again.",
                severity: "error",
            });
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                    Farmer Registration Request
                </Typography>

                <Box sx={{ mb: 4, mt: 2 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body1">
                            To join our platform, please fill out the form below. Our admin team will review your request and contact you shortly.
                        </Typography>
                    </Alert>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <ContactMailIcon sx={{ mr: 1 }} />
                                <Typography>
                                    Email: admin@agrodirect.com
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <PhoneIcon sx={{ mr: 1 }} />
                                <Typography>
                                    Phone: +1 (555) 123-4567
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label="Mobile Number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Additional Message (Optional)"
                                name="message"
                                multiline
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    size="large"
                                >
                                    Submit Request
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="large"
                                    onClick={() => navigate("/farmer/login")}
                                >
                                    Back to Login
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
