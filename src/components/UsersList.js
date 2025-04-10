import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function UsersList() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        userlist()
    }, []
    );
    const userlist = async () => {
        try {
            console.log('User Data:', userData);
            const token = sessionStorage.getItem("token");
            console.log("Token : " + token);
            if (!token) {
                navigate('/login');
            }
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

    function visitProfile(id){
         navigate(`/profile/${id}`);
    }

    return (
        <Card sx={{ maxWidth: 600, marginLeft: '300px' }}>
            <Typography align='center' fontWeight='700' variant='h6' sx={{ textDecoration: 'underline' }}>User List</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450, marginTop: '30px' }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: 700 }} align="center">Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">Email</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">Image</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">Profile</TableCell>
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
                                    <img src={`http://localhost:5000${user.image}`} alt='user_profile' style={{width:'50px', height:'50px'}}/>
                                </TableCell>
                                <TableCell align="center">
                                    <Button onClick={()=>visitProfile(user._id)}>View</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}
