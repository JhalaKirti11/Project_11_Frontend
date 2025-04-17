
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
    Box, Card, CardActions, CardContent,
    Button, Typography, TextField, Modal
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { MenuItem } from '@mui/material';

export function AddProduct() {
    const [formData, setFormData] = useState({});
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({})
    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: (theme.vars ?? theme).palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));


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

    const getCategories = async () => {
        try {
            const token = sessionStorage.getItem("token");
            console.log("Token:", token);
            if (!token) {
                navigate('/login');
            }

            const response = await axios.get("http://localhost:5000/product/viewCategory", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response) {
                console.log("categories are : " + response.data.category)
                setCategories(response.data.category);
            } else {
                console.log("categories can not be added.")
            }
        } catch (error) {
            console.error(error);
            setModalMsg("Failed to load categories");
            setOpenModal(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, description, category, quantity, price, image } = formData;
        const newErrors = {};
        let hasError = false;

        if (!name) {
            newErrors.name = "Name is required";
            hasError = true;
        }
        if (!description) {
            newErrors.description = "Description is required";
            hasError = true;
        }
        if (!category) {
            newErrors.category = "Category is required";
            hasError = true;
        }
        if (!quantity) {
            newErrors.quantity = "Quantity is required";
            hasError = true;
        }
        if (!price) {
            newErrors.price = "Price is required";
            hasError = true;
        }
        if (!image) {
            newErrors.image = "Image is required";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            const token = sessionStorage.getItem("token");
            console.log("Token:", token);
            if (!token) {
                navigate('/login');
            }

            await axios.post("http://localhost:5000/product/createProduct", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setModalMsg("Product added successfully!");
            setOpenModal(true);

            setFormData({});
           
            setTimeout(() => {
                setOpenModal(false);
                setImage('');
                navigate("/productlist");
            }, 1500);

        } catch (error) {
            console.error(error);
            setModalMsg("Failed to add product");
            setOpenModal(true);
        }
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <>
            <Box>
                <Card sx={{ p: 3 }}>
                    <CardContent>
                        <Typography align='center' fontWeight='700' variant='h6' sx={{ textDecoration: 'underline' }}>Add Product</Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '100%' }
                            }}
                            noValidate
                            autoComplete="off">
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField required name="name" label="Name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField required name="description" label="Description" value={formData.description} onChange={handleChange} error={!!errors.description} helperText={errors.description}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField
                                        select
                                        required
                                        name="category"
                                        label="Category"
                                        value={formData.category || ''}
                                        onChange={handleChange}
                                        error={!!errors.category}
                                        helperText={errors.category}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.name} value={category.name}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField name="size" label="Size" type="size" value={formData.size} onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField required name="quantity" label="Quantity" type="category" value={formData.quantity} onChange={handleChange} error={!!errors.quantity} helperText={errors.quantity}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField required name="price" label="Price" type="price" value={formData.price} onChange={handleChange} error={!!errors.price} helperText={errors.price}
                                    />
                                </Grid>

                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <Button variant="outlined" component="label">
                                        {image ? (
                                            <img src={image} alt="Preview" width="200" height="200" style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <>Upload Product Image</>
                                        )}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            error={!!errors.image} helperText={errors.image}
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                            <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                                <Button type="submit" variant="outlined">Submit</Button>
                            </CardActions>
                        </Box>
                    </CardContent>
                </Card>
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300, bgcolor: 'background.paper',
                        borderRadius: 0, boxShadow: 12, p: 2, textAlign: 'center'
                    }}>
                        <Typography id="modal-title" variant="h6" fontWeight={800}>
                            Message
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            {modalMsg}
                        </Typography>
                    </Box>
                </Modal>
            </Box >
        </>
    )
}