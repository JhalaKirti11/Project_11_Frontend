import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Box, Button, Card, Grid, TextField, Typography, Modal } from "@mui/material";

const socket = io.connect("http://localhost:5000");

export const Message = () => {
    const [msg, setMsg] = useState('');
    const [msgReceived, setMsgReceived] = useState('');
    useEffect(() => {
        socket.on('receive_message', (data) => {
            // alert(data.message);
            setMsgReceived(data.message)
        })
    }, [socket])

    const msgAction = () => {
        // setName(e.target.value);
        // setError('');

        socket.emit('user-message', { message: msg });
    }

    return (
        <Box align='center' sx={{ m: 5 }}>
            <TextField
                id="outlined-required"
                label="Chat"
                onChange={(e)=>{setMsg(e.target.value)}}
            />
            <Button variant="contained" onClick={msgAction}>Click</Button>
            <Typography variant='h6'>Messages : </Typography>
            <Typography>{msgReceived}</Typography>
        </Box>
    )
}