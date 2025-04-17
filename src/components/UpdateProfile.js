import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, Grid, TextField, Typography, Modal } from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";

export const UpdateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        image: "",
    });
    const [errors, setErrors] = useState({ email: '', name: '' });

    const [selectedImage, setSelectedImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = sessionStorage.getItem("token");
            console.log("token fetching the data : " + token)
            const response = await axios.get(`http://localhost:5000/user/profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.data.user) {
                console.log("res : " + response.data.user.email);
                setUserData(response.data.user);
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserData({ ...userData, image: file });
        setSelectedImage(file);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem("token");
            const { email, name } = userData;
            let hasError = false;
            const newErrors = { email: '', name: '' };
            if (!name) {
                newErrors.name = "name is required";
                hasError = true;
            }

            if (!email) {
                newErrors.email = "Email is required";
                hasError = true;
            } else if (!email.endsWith("@gmail.com")) {
                newErrors.email = "This is not a valid gmail address";
                hasError = true;
            }

            if (hasError) {
                setErrors(newErrors);
                return;
            }
            const response = await axios.put(
                `http://localhost:5000/user/update/${id}`,
                {
                    name: userData.name,
                    email: userData.email,
                    image: userData.image,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.success) {
                setModalMsg("Updated successful!");
                setOpenModal(true);
                setTimeout(() => navigate("/userslist"), 1500);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setModalMsg("Updates failed");
            setOpenModal(true);
        }
    };

    return (
        <Box sx={{ justifyContent: "center", display: "flex", mt: 8 }}>
            <Card sx={{ p: 4, width: 400 }}>
                <Typography variant="h6" textAlign="center" gutterBottom>
                    Update Profile
                </Typography>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={2} direction="column">
                        <Grid item textAlign="center">
                            <label htmlFor="image">
                                <img
                                    src={
                                        selectedImage
                                            ? URL.createObjectURL(selectedImage)
                                            : `http://localhost:5000/${userData.image}`
                                    }
                                    alt="User"
                                    style={{
                                        height: "100px",
                                        width: "100px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        cursor: "pointer"
                                    }}
                                />
                            </label>
                            <input
                                id='image'
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                name="name"
                                label="Name"
                                fullWidth
                                value={userData.name}
                                onChange={handleChange}
                                error={!!errors.name} helperText={errors.name}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                name="email"
                                label="Email"
                                fullWidth
                                value={userData.email}
                                onChange={handleChange}
                                error={!!errors.email} helperText={errors.email}
                            />
                        </Grid>

                        <Grid item textAlign="center">
                            <Button type="submit" variant="contained">
                                Update Profile
                            </Button>
                        </Grid>
                    </Grid>
                </form>
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
};