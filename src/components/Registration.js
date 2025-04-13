import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
    Box, Card, CardContent, CardActions, Button,
    Typography, TextField, Modal
} from '@mui/material';

export function Registration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [imagePreview, setImagePreview] = useState('');
    const [viewImageModal, setViewImageModal] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = formData;
        const newErrors = { name: '', email: '', password: '' };
        let hasError = false;

        if (!name) {
            newErrors.name = "Name is required";
            hasError = true;
        }
        if (!email) {
            newErrors.email = "Email is required";
            hasError = true;
        } else if (!email.endsWith("@gmail.com")) {
            newErrors.email = "Only Gmail addresses allowed";
            hasError = true;
        }
        if (!password) {
            newErrors.password = "Password is required";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/user/register', formData);
            setModalMsg("Registration successful!");
            setOpenModal(true);
            setTimeout(() => navigate("/userslist"), 1500);
        } catch (err) {
            console.log(err);
            if (err.response?.data?.error?.toLowerCase().includes("email")) {
                setErrors(prev => ({ ...prev, email: "Email already registered" }));
            } else {
                setModalMsg("Registration failed");
                setOpenModal(true);
            }
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    };

    const visitLogin = () => {
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Card sx={{ p: 3, width: 350 }}>
                <CardContent>
                    <Typography variant="h6" align="center" gutterBottom>
                        Welcome User
                    </Typography>
                    <Typography align="center" sx={{ fontWeight: 600, mb: 2 }}>
                        Register
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '100%' }
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            required
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />

                        <TextField
                            required
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />

                        <TextField
                            required
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />

                        <TextField
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const base64 = await convertToBase64(file);
                                    setFormData(prev => ({
                                        ...prev,
                                        image: base64
                                    }));
                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                            style={{ marginTop: '10px' }}
                        ></TextField>

                        {imagePreview && (
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{ mt: 1 }}
                                onClick={() => setViewImageModal(true)}
                            >
                                View
                            </Button>
                        )}

                        <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                            <Button type="submit" variant="contained">Register</Button>
                            <Button type="button" variant="outlined" onClick={visitLogin}>Login</Button>
                        </CardActions>
                    </Box>
                </CardContent>
            </Card>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    borderRadius: 0,
                    boxShadow: 12,
                    p: 2,
                    textAlign: 'center'
                }}>
                    <Typography variant="h6" fontWeight={800}>
                        Message
                    </Typography>
                    <Typography sx={{ mt: 2 }}>{modalMsg}</Typography>

                </Box>
            </Modal>

            <Modal open={viewImageModal} onClose={() => setViewImageModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    p: 2,
                    boxShadow: 24,
                    maxWidth: 300,
                    textAlign: 'center'
                }}>
                    <Typography variant="h6">Uploaded Image</Typography>
                    <img
                        src={imagePreview}
                        alt="Uploaded"
                        style={{ width: '100%', marginTop: '10px' }}
                    />
                </Box>
            </Modal>


        </Box>
    );
}

