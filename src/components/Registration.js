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

    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = formData;

        if (!name || !email || !password) {
            setModalMsg("Please fill all fields!");
            setOpenModal(true);
            return;
        }

        if (!email.endsWith("@gmail.com")) {
            setModalMsg("Please enter a valid Gmail address.");
            setOpenModal(true);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/user/register', formData);
            setModalMsg("Registration successful!");
            setOpenModal(true);
            setTimeout(() => navigate("/userslist"), 1500);
        } catch (err) {
            console.log(err);
            setModalMsg("Email already registered!");
            setOpenModal(true);
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
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '100%' }
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField required name="name" label="Name" value={formData.name} onChange={handleChange}
                        />
                        <TextField required name="email" label="Email" value={formData.email} onChange={handleChange}
                        />
                        <TextField required name="password" label="Password" type="password" value={formData.password} onChange={handleChange}
                        />

                        <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                            Upload Image
                            <input type="file" hidden accept="image/*" onChange={async (e) => {
                                    const file = e.target.files[0];
                                    const base64 = await convertToBase64(file);
                                    setFormData(prev => ({
                                        ...prev,
                                        image: base64
                                    }));
                                }}
                            />
                        </Button>

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

