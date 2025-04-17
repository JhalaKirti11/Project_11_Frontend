
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

    const handleImageChange = async (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
        setImagePreview(URL.createObjectURL(e.target.files[0]));
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
            newErrors.email = "This is not a valid gmail address";
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

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('image', formData.image);

        try {
            const res = await axios.post('http://localhost:5000/user/register', data, {
                'Content-Type': 'multipart/form-data'
            });
            setModalMsg("Registration successful!");
            setOpenModal(true);
            setTimeout(() => navigate("/userslist"), 1500);
        } catch (err) {
            console.log(err);
            if (err.response?.data?.error?.toLowerCase().includes("email")) {
                setErrors(prev => ({ ...prev, email: "This gmail is already registered" }));
            } else {
                setModalMsg("Registration failed");
                setOpenModal(true);
            }
        }
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
                        <TextField required name="name" label="Name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name}
                        />

                        <TextField required name="email" label="Email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email}
                        />

                        <TextField required name="password" label="Password" type="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Selected"
                                    width="200"
                                    height="200"
                                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                                />
                            )}

                            <Button variant="outlined" component="label">
                                Choose Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </Box>

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
        </Box>
    );
}