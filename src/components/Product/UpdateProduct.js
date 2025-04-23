import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";
import {
    Box, Card, CardActions, CardContent, Autocomplete,
    Button, Typography, TextField, Modal
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

export function UpdateProduct() {

    const [formData, setFormData] = useState({});
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({})
    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);
    console.log("Token:", token);
    if (!token) {
        navigate('/login');
    }
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
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

    useEffect(() => {
        fetchProductData();
        getCategories();
    }, [])

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/product/viewProduct/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response) {
                console.log("res : " + response.data.product.category.name);
                setFormData({
                    ...response.data.product,
                    category: response.data.product.category.name
                });

            }
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };
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
        const { name, description, category, quantity, price, size } = formData;
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

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append('category', category);
            formData.append('quantity', quantity);
            formData.append("price", price);
            if (size) {
                formData.append("size", size);
            }
            if (image) {
                formData.append("image", image);
            }
            await axios.put(`http://localhost:5000/product/updateProduct/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setModalMsg("Product Updated successfully!");
            setOpenModal(true);
            setTimeout(() => {
                navigate("/productlist");
            }, 1500);

        } catch (error) {
            console.error(error);
            setModalMsg("Failed to Update product");
            setOpenModal(true);
        }
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
        setImage(e.target.files[0]);
    };

    return (
        <>
            <Box>
                <Card sx={{ p: 3 }}>
                    <CardContent>
                        <Typography align='center' fontWeight='700' variant='h6' sx={{ textDecoration: 'underline' }}>Update Product</Typography>
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
                                    <TextField required name='name' label='Name' value={formData.name || ""} onChange={handleChange} error={!!errors.name} helperText={errors.name}
                                    />

                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField required name="description" label='Description' value={formData.description || ""} onChange={handleChange} error={!!errors.description} helperText={errors.description}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <Autocomplete
                                        options={categories}
                                        getOptionLabel={(option) => option.name}
                                        value={categories.find((cat) => cat.name === formData.category) || null}
                                        onChange={(event, newValue) => {
                                            handleChange({
                                                target: {
                                                    name: 'category',
                                                    value: newValue ? newValue.name : '',
                                                },
                                            });
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Category"
                                                name="category"
                                                required
                                                error={!!errors.category}
                                                helperText={errors.category}
                                            />
                                        )}
                                        isOptionEqualToValue={(option, value) => option.name === value.name}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField name="size" label='Size' type='size' value={formData.size || ""} onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField required name="quantity" label='Quantity' type="quantity" value={formData.quantity || ""} onChange={handleChange} error={!!errors.quantity} helperText={errors.quantity}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <TextField required name="price" label="Price" type="price" value={formData.price || ""} onChange={handleChange} error={!!errors.price} helperText={errors.price}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <label htmlFor="image">
                                        <img
                                            src={
                                                image
                                                    ? URL.createObjectURL(image)
                                                    : `http://localhost:5000/${formData.image}`
                                            }
                                            alt="Product"
                                            style={{
                                                height: "100px",
                                                width: "100px",
                                                objectFit: "cover",
                                                cursor: "pointer"
                                            }}
                                        />
                                    </label>
                                    <input
                                        required
                                        id='image'
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}></Grid>
                                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                                    <CardActions sx={{ justifyContent: 'end', mt: 2 }}>
                                        <Button type="submit" variant="contained" sx={{ color: 'white' }}>Submit</Button>
                                    </CardActions>
                                </Grid>
                            </Grid>
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