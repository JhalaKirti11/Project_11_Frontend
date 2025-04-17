import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

export function ProductList() {
    const [productData, setproductData] = useState([]);
    const [selecteId, setSelectedId] = useState('');
    const navigate = useNavigate();
    const [modalMsg, setModalMsg] = useState('');
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
            navigate('/login');
        } else {
            productlist(token);
        }
    }, []);

    const productlist = async (token) => {
        try {
            console.log('product Data:', productData);
            const response = await axios.get("http://localhost:5000/product/viewAllProduct", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("product Data:", response.data.products);
            setproductData(response.data.products);

        } catch (error) {
            console.log("Error during fetching data:", error);
            console.log("Can not fetch the product data");
        }
    };

    function deactivateProduct(id) {
        setSelectedId(id);
        setModalMsg("Are you sure you want to delete it!");
        setOpenModal(true);
    }

    const deleteProduct = async (id) => {
        const token = sessionStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
            navigate('/login');
        }
        try {
            console.log("id: " + id);
            console.log("token: " + token)
            const response = await axios.put(`http://localhost:5000/product/deleteProduct/${id}`, { state: false }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("product deactivated...");
            setOpenModal(false);
            productlist(token);
        } catch (error) {
            console.log("Error during deactivating product:", error);
            console.log("Can not deactivating the product");
        }
    }

    function editProduct(id, product) {
        navigate(`/updateProduct/${id}`);
    }

    return (
        <>
            <Box sx={{ justifyContent: 'center', mt: 8 }}>
                <div align='right' dispaly='flex'>
                    <Button variant="contained" onClick={() => navigate("/addProduct")}>Add Product</Button>
                    <Button variant="contained" onClick={() => navigate("/addCategory")} sx={{ marginLeft: 2 }}>Category</Button>
                </div>
                <Card>
                    <Typography align='center' fontWeight='700' variant='h6' sx={{ textDecoration: 'underline' }}>Product List</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 450, marginTop: '30px' }} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Description</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Category</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">size</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Quantity</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Price</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Image</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Edit</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Delete</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {productData.map((product) => (
                                    <TableRow
                                        key={product.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" align="center" scope="row">
                                            {product.name ||'--'}
                                        </TableCell>
                                        <TableCell align="center">{product.description ||'--'}</TableCell>
                                        <TableCell align="center">{product.category.name ||'--'}</TableCell>
                                        <TableCell align="center">{product.size ||'--'}</TableCell>
                                        <TableCell align="center">{product.quantity ||'--'}</TableCell>
                                        <TableCell align="center">{product.price ||'--'}</TableCell>

                                        <TableCell align="center">
                                        <img src={`http://localhost:5000/${product.image}` ||'--'} alt="product" style={{ width: '50px', height: '50px' }} />
                                        </TableCell>
                                        <TableCell component="th" align="center" scope="row" sx={{ color: '#504e4ec9' }} >
                                            <Button variant="text" size="small" sx={{ mt: 1, color: '#504e4ec9' }} onClick={() => editProduct(product._id, product)}>
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell component="th" align="center" scope="row" >
                                            <Button variant="text" size="small" sx={{ mt: 1, color: '#504e4ec9' }} onClick={() => deactivateProduct(product._id)}>
                                                <DeleteOutlinedIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                        <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: 'green' }} onClick={() => deleteProduct(selecteId)}>
                            Delete
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}