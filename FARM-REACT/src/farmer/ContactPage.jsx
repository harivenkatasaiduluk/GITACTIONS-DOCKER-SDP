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
    Card,
    CardContent,
    IconButton,
    Divider,
} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import "./farmer.css";

export default function ContactPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
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
                address: "",
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
        <div className="contact-page">
            <Container maxWidth="lg">
                <Box sx={{ mb: 4, mt: 2, display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => navigate("/farmer/login")} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" component="h1" color="primary" sx={{ fontWeight: "bold" }}>
                        Contact Us
                    </Typography>
                </Box>

                {/* Why Choose AgroDirect Section */}
                <Box className="why-choose-section" sx={{ mb: 6 }}>
                    <Typography variant="h4" component="h2" align="center" color="primary" sx={{ mb: 4, fontWeight: "bold" }}>
                        Why Choose AgroDirect?
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card className="feature-card">
                                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, width: '100%' }}>
                                        <LocalShippingIcon sx={{ fontSize: 60, color: "#4CAF50", mb: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2E7D32", mb: 1, width: '100%' }}>
                                            Direct Farm-to-Table
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, width: '100%' }}>
                                            Connect directly with farmers and get fresh produce at the best prices. Experience the benefits of our streamlined supply chain.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className="feature-card">
                                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, width: '100%' }}>
                                        <VerifiedIcon sx={{ fontSize: 60, color: "#4CAF50", mb: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2E7D32", mb: 1, width: '100%' }}>
                                            Quality Assured
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, width: '100%' }}>
                                            All our products undergo strict quality checks to ensure the best for you. We maintain high standards throughout our supply chain.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className="feature-card">
                                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, width: '100%' }}>
                                        <SupportAgentIcon sx={{ fontSize: 60, color: "#4CAF50", mb: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2E7D32", mb: 1, width: '100%' }}>
                                            24/7 Support
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, width: '100%' }}>
                                            Our dedicated team is always ready to assist you with any queries. Get help whenever you need it, day or night.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Grid container spacing={4}>
                    {/* Contact Information Cards */}
                    <Grid item xs={12} md={4}>
                        <Card className="contact-card">
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <ContactMailIcon sx={{ fontSize: 40, color: "#4CAF50", mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Email Us
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            admin@agrodirect.com
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card className="contact-card">
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <PhoneIcon sx={{ fontSize: 40, color: "#4CAF50", mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Call Us
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            +1 (555) 123-4567
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card className="contact-card">
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <LocationOnIcon sx={{ fontSize: 40, color: "#4CAF50", mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Visit Us
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            123 Agriculture Street<br />
                                            Farming District, 12345
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Registration Form */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} className="contact-form-paper">
                            <Box sx={{ p: 4 }}>
                                <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: "bold" }}>
                                    Farmer Registration Request
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                    Fill out the form below to request registration as a farmer. Our team will review your application and contact you shortly.
                                </Typography>

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
                                                className="contact-input"
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
                                                className="contact-input"
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
                                                className="contact-input"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Address"
                                                name="address"
                                                multiline
                                                rows={2}
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="contact-input"
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
                                                className="contact-input"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    size="large"
                                                    className="submit-button"
                                                >
                                                    Submit Request
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

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
        </div>
    );
} 