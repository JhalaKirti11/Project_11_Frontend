import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import {
    Box, Card, CardContent, Typography, TextField, Button, Modal, CardActions,
    TableHead, TableCell, TableRow, TableBody, Table, TableContainer, Paper
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

export function AddCategory() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [name2, setName2] = useState('');

    const navigate = useNavigate();
    const handleChange = (e) => {
        setName(e.target.value);
        setError('');
        setName2(e.target.value);
        setError('');
    };
    const token = sessionStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
        navigate('/login');
    }
    useEffect(() => {
        getCategories();
    }, []);

    //--------------------------- Category list --------------------------------
    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/product/viewCategory", {
                headers: {
                    Authorization: `Bearer ${token}`
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

    //-------------------------- Delete Category -----------------------------------

    const deleteCategory = (id) => {
        setSelectedId(id);
        setModalMsg("Are you sure you want to delete it!");
        setOpenModal(true);
    }

    // --------------- delete Confirm -------------------------
    const deleteConfirm = async (id) => {
        try {
            console.log("id: " + id);
            console.log("token: " + token)
            const response = await axios.put(`http://localhost:5000/product/deleteCategory/${id}`, { state: true }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("product deactivated...");
            setOpenModal(false);
            getCategories(token);
        } catch (error) {
            console.log("Error during deleting category:", error);
            console.log("Can not delete the category");
        }
    }

    //--------------------------- Update Category ----------------------------------
    const editCategory = async (id, currentCategory) => {
        setSelectedId(id);
        setName2(currentCategory.name);
        setOpenModal2(true);
    };

    // -------------------------- Update confirm -------------------------------
    const editConfirm = async (id) => {
        if (!name2.trim()) {
            setError("Category name is required");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/product/updateCategory/${id}`,
                { name2 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

            if (response?.data) {
                console.log("Updated successfully:", response.data);
                getCategories();
                setOpenModal2(false);
            } else {
                console.log("Cannot update the category!");
            }

        } catch (error) {
            console.log("Error during editing category:", error);
            console.log("Cannot edit the category");
        }
    };

    //----------------------------- Add Category -----------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setError('Category name is required');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/product/createCategory', { name }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setModalMsg(res.data.msg || 'Category added successfully!');
            setOpenModal3(true);
            setName('');
            getCategories();
        } catch (err) {
            console.error(err);
            setModalMsg('Failed to add category');
            setOpenModal3(true);
        }
    };

    //----------------------------------- UI ---------------------------------------

    return (
        <Box>
            <Card sx={{ p: 3, maxWidth: '80%', mx: 'auto', mt: 4, alignItems: 'center' }}>
                <CardContent>
                    <Card component={Paper} sx={{ maxWidth: '40%', align: 'center', marginLeft: '285px' }}>
                        <Typography align='center' fontWeight='700' variant='h6' sx={{ textDecoration: 'underline' }}>Add Category</Typography>

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex', flexDirection: 'column',
                                '& .MuiTextField-root': { m: 1 }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                required
                                name="name"
                                label="Category"
                                value={name}
                                onChange={handleChange}
                                error={!!error}
                                helperText={error}
                            />
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button type="submit" variant="contained" sx={{ color: 'white', backgroundColor: 'green' }}>Add</Button>
                            </CardActions>
                        </Box>
                    </Card>
                </CardContent>

                <CardContent>
                    <Typography align='center' fontWeight='700' variant='h6' sx={{ textDecoration: 'underline' }}>Category List</Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 450, marginTop: '30px' }} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    {/* <TableCell sx={{ fontWeight: 700 }} align="center">Id</TableCell> */}
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Edit</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Delete</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow
                                        key={category.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/* <TableCell component="th" align="center" scope="row">
                                            {category._id}
                                        </TableCell> */}
                                        <TableCell align="center">{category.name}</TableCell>

                                        <TableCell component="th" align="center" scope="row" sx={{ color: '#504e4ec9' }} >
                                            <Button variant="text" size="small" sx={{ mt: 1, color: '#504e4ec9' }} onClick={() => editCategory(category._id, category)}>
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell component="th" align="center" scope="row" >
                                            <Button variant="text" size="small" sx={{ mt: 1, color: '#504e4ec9' }} onClick={() => deleteCategory(category._id)}>
                                                <DeleteOutlinedIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* ----------------------------- Modal ------------------------------------ */}
            <Modal
                open={openModal3}
                onClose={() => setOpenModal3(false)}
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
                    <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: 'green' }} onClick={() => deleteConfirm(selectedId)}>
                        Delete
                    </Button>
                </Box>
            </Modal>


            {/* ----------------- Updating Modal--------------------------------- */}
            <Modal open={openModal2} onClose={() => setOpenModal2(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, bgcolor: 'background.paper', borderRadius: 0, boxShadow: 12, p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={800}>
                        Update
                    </Typography>
                    {/* <TextField required name="name" label="Category Name" value={name} onChange={handleChange} error={!!error} helperText={error}
                    /> */}
                    <TextField
                        name="name2"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                    />
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button type="submit" variant="outlined" size="small" onClick={() => editConfirm(selectedId)}>
                            Update
                        </Button>
                    </CardActions>
                </Box>
            </Modal>
        </Box>
    );
}
