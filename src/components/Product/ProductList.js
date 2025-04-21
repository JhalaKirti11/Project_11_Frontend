import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

export function ProductList() {
    const [productData, setproductData] = useState([]);
    const [selecteId, setSelectedId] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();
    const [modalMsg, setModalMsg] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);


    const token = useSelector((state) => state.user.token);
    console.log("Token:", token);
    if (!token) {
        navigate('/login');
    }

    useEffect(() => {
        productlist();
    }, []);

    useEffect(() => {
        const filtered = productData.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, productData]);


    const productlist = async () => {
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
                <Grid container spacing={2} sx={{ display: 'flex', flexGrow: 1 }}>
                    <Grid size={7} sx={{ justifyContent: 'start' }}>
                        <Box sx={{ display: 'flex', mx: 3, my: 2 }}>
                            <Typography variant="h6" sx={{ mx: 3, mt: 2 }}>Search</Typography>
                            <TextField
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '300px'
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid size={4} align='end' sx={{ mt: 3, mx: 1 }}>
                        <Button variant="contained" onClick={() => setOpenModal2(true)}>Filter</Button>
                    </Grid>
                </Grid>
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
                                {filteredProducts.map((product) => (
                                    <TableRow
                                        key={product.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" align="center" scope="row">
                                            {product.name || '--'}
                                        </TableCell>
                                        <TableCell align="center">{product.description || '--'}</TableCell>
                                        <TableCell align="center">{product.category.name || '--'}</TableCell>
                                        <TableCell align="center">{product.size || '--'}</TableCell>
                                        <TableCell align="center">{product.quantity || '--'}</TableCell>
                                        <TableCell align="center">{product.price || '--'}</TableCell>

                                        <TableCell align="center">
                                            <img src={`http://localhost:5000/${product.image}` || '--'} alt="product" style={{ width: '50px', height: '50px' }} />
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
                <Modal open={openModal2} onClose={() => setOpenModal2(false)}>
                    <Card sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '80%',
                        transform: 'translate(-50%, -50%)',
                        width: 350,
                        bgcolor: 'background.paper',
                        borderRadius: 0,
                        boxShadow: 12,
                        p: 2
                    }}>
                        <Typography variant={'h6'}>By Category</Typography>
                    </Card>
                </Modal>
            </Box>
        </>
    )
}