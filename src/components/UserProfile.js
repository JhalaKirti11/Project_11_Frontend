import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export const UserProfile = () => {
    const { id } = useParams();

    const [ userData, setUserData ] = useState({});
    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/user/profile/${id}`);
            if(response){
                console.log("user found : "+response.data.user);
                setUserData(response.data.user);
            }
        } catch (error) {
            console.log("error : " + error);
        }
    }
    return(
        <Card>
            <Typography>Name : {userData.name}</Typography>
            <Typography>Email : {userData.email}</Typography>
            <Typography>Image : </Typography>
            <img src={`http://localhost:5000${userData.image}`} alt='user profile'/>
            </Card>
    )

}