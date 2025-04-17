import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            paper: '#d5d9edd9'
        }
    }
})

export const UserProfile = () => {
    const { id } = useParams();

    const [userData, setUserData] = useState({});
    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            console.log("fetching data..." + id)
            const token = sessionStorage.getItem("token");
            console.log("Token : " + token);
            const response = await axios.get(`http://localhost:5000/user/profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("data fetched...")
            if (response) {
                console.log("user found : " + response.data.user);
                setUserData(response.data.user);
            }
        } catch (error) {
            console.log("Error during fetching data : error : " + error);
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ justifyContent: 'center', display: 'flex', mt: 25 }}>
                <Card sx={{ p: 4 }}>
                    <Grid container spacing={4} sx={{ justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                        <img src={`http://localhost:5000/${userData.image}`} alt='user profile' style={{ height: '100px', width: '100px' }} />
                    </Grid>
                    <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: '700' }}>Name : {userData.name}</Typography>
                    <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: '700' }}>Email : {userData.email}</Typography>
                </Card>
            </Box>
        </ThemeProvider>
    )
}