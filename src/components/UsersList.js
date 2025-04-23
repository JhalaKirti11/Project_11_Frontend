import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

export function UsersList() {
    const [userData, setUserData] = useState([]);
    const [selecteId, setSelectedId] = useState('');
    const [modalMsg, setModalMsg] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const navigate = useNavigate();

    const token = useSelector((state) => state.user.token)
    const _id = useSelector((state) => state.user._id);

    useEffect(() => {
        console.log("Token:", token);

        if (!token) {
            navigate('/login');
        }
        userlist();

    }, []);

    const userlist = async () => {
        try {
            console.log('User Data:', userData);
            const response = await axios.get("http://localhost:5000/user/allUsers", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("User Data:", response.data.users);
            setUserData(response.data.users);

        } catch (error) {
            console.log("Error during fetching data:", error);
            console.log("Can not fetch the user data");
        }
    };

    function deactivateProfile(id) {
        setSelectedId(id);
        setModalMsg("Are you sure you want to delete it!");
        setOpenModal(true);
    }

    const deleteProfile = async (id) => {

        if (!token) {
            navigate('/login');
        }
        try {
            console.log("id " + id);
            console.log("token : " + token)
            const response = await axios.put(`http://localhost:5000/user/delete/${id}`, { state: false }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("user deactivated...");
            setOpenModal(false);
            userlist(token);
        } catch (error) {
            console.log("Error during deactivating user:", error);
            console.log("Can not deactivating the user");
        }
    }

    function editProfile(id, user) {
        sessionStorage.setItem("user", JSON.stringify(user));

        if (_id !== id) {
            setModalMsg("You are not the admin of this profile!");
            setOpenModal2(true);
            setTimeout(() => navigate("/userslist"), 200000);
        } else
            navigate(`/update/${id}`);
    }

    function visitProfile(id) {
        navigate(`/profile/${id}`);
    }

    return (
        <>
            <Box sx={{ justifyContent: 'center', align:'center' }}>
                <Button variant="contained" sx={{ m: 2 }} onClick={() => navigate("/productlist")}>Products</Button>
                <Button variant="contained" sx={{ m: 2 }} onClick={() => navigate("/textEditor")}>Text Editor</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>

                <Card sx={{ maxWidth: 750 }}>
                    <Typography align='center' fontWeight='700' variant='h6' sx={{ textDecoration: 'underline' }}>User List</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 450, marginTop: '30px' }} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Email</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Image</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Profile</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Update</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="center">Delete</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {userData.map((user) => (
                                    <TableRow
                                        key={user.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" align="center" scope="row">
                                            {user.name}
                                        </TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell align="center">
                                            <img src={`http://localhost:5000/${user.image}`} alt='user_profile' style={{ width: '50px', height: '50px' }} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => visitProfile(user._id)}>View</Button>
                                        </TableCell>
                                        <TableCell component="th" align="center" scope="row" sx={{ color: '#504e4ec9' }} >
                                            <Button variant="text" size="small" sx={{ mt: 1, color: '#504e4ec9' }} onClick={() => editProfile(user._id, user)}>
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell component="th" align="center" scope="row" >
                                            <Button variant="text" size="small" sx={{ mt: 1, color: '#504e4ec9' }} onClick={() => deactivateProfile(user._id)}>
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
                        <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: 'green' }} onClick={() => deleteProfile(selecteId)}>
                            Delete
                        </Button>
                    </Box>
                </Modal>
                <Modal open={openModal2} onClose={() => setOpenModal2(false)}>
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
        </>
    )
}