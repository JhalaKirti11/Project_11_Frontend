import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { Box, Button, Card, CardContent, CardActions, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Container, TextField, Typography, AppBar, Toolbar, FormControl, OutlinedInput } from "@mui/material";
import Person3Icon from '@mui/icons-material/Person3';
import SendIcon from '@mui/icons-material/Send';

const socket = io.connect("http://localhost:5000");

export const Message = () => {
    const [usersData, setUsersData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([])

    const [userChat, setUserChat] = useState({});
    const [notifications, setNotifications] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [msg, setMsg] = useState('');
    const [msgReceived, setMsgReceived] = useState('');

    const token = useSelector((state) => state.user.token);
    const id = useSelector((state) => state.user._id);

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
        // getChats();
        socket.on('receive_message', (data) => {
            // alert(data.message);
            console.log("Data. message : " + data.message)
            setMsgReceived(data.message)
        })
    }, [socket, notifications]);

    // const msgAction = () => {
    //     socket.emit('user-message', { message: msg });
    // }


    useEffect(() => {
        let filtered = usersData;
        if (searchQuery) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredUsers(filtered)
    }, [searchQuery, usersData]);

    const sendMsg = async () => {
        try {
            console.log("msg sending started...");
            console.log("Receiver's id : " + userChat._id);
            const send = await axios.post(`http://localhost:5000/chat/sendMessage/${id}`, {
                senderId: id,
                receiverId: userChat._id,
                message: msg
            });
            if (send) {
                console.log("message send" + send);
                console.log("extra : " + send.data.msg);

            }
            socket.emit('user-message', { message: msg });
        } catch (error) {
            console.log("Error duringsending message:", error);
            console.log("Can not send the Message!");
        }
    }

    const getChats = async () => {
        try {
            console.log(" viewing chats and Id : " + id)
            const res = await axios.get(`http://localhost:5000/chat/getMsgs/${id}`);
            if (res) {
                // const jsonMsg = JSON.stringify(res.data.messages);
                console.log("Your notifications are here : " + res.data.messages);
                setNotifications(res.data.messages);
            }
        } catch (error) {
            console.log("Error during fetching data:", error);
            console.log("Can not fetch the message data");
        }
    }

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/user/allUsers", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("User Data:", response.data.users);
            setUsersData(response.data.users);
        } catch (error) {
            console.log("Error during fetching data:", error);
            console.log("Can not fetch the user data");
        }
    }
    const showChat = (user) => {
        getChats();
        const userDemo = JSON.stringify(user);
        console.log("User Demo : " + userDemo)

        console.log("Here is the user : " + user.name + " ,  notfications : " + user.notification)
        setUserChat(user);
        const chat = JSON.stringify(notifications);
        console.log("User's Chat : " + chat);
    }

    return (
        <Box sx={{ display: 'flex', bgcolor: '#b9d6f0a1' }}>

            <Container sx={{ width: '40%', m: 0 }}>

                <Box sx={{ ml: 3, my: 2, bgcolor: '#ffffff', borderRadius: '4px', height: '100vh' }}>
                    {/* <Typography variant="h6" sx={{ mx: 3, mt: 2 }}>Search</Typography> */}
                    <TextField
                        type="text"
                        id="outlined-basic"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            width: '85%',
                            px: 3, pt: 2,
                            borderRadius: '25px',
                            color: 'red'
                        }}
                    />
                    {/* <TableBody>
                    {filteredUsers.map((user) => (
                        <Button onClick={() => showChat(user)}
                            key={user.name}
                            fullWidth
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, justifyContent: 'start', textTransform: 'capitalize' }}
                        >
                            <TableCell component="th" scope="row" sx={{ borderBottom: 0 }}>
                                <img src={`http://localhost:5000/${user.image}`} alt='user_profile' style={{ width: '50px', height: '50px' }} />
                               <Person3Icon sx={{ color: '#716d6db8', border: '1px solid #716d6db8', borderRadius: '50px', p: 1 }} /> 
                            </TableCell>
                            <TableCell sx={{ borderBottom: 0 }}>{user.name}</TableCell>

                        </Button>
                    ))}
                </TableBody> */}

                    <List>
                        {filteredUsers.map((user) => (
                            <ListItemButton key={user.name} onClick={() => showChat(user)} sx={{ textTransform: 'capitalize' }}>
                                <ListItemAvatar>
                                    {user.image ? (
                                        <img src={`http://localhost:5000/${user.image}`} alt='user_profile' style={{ width: '50px', height: '50px' }} />
                                    ) : (
                                        <Avatar alt="Profile Picture" src={<Person3Icon />} />
                                    )}
                                </ListItemAvatar>
                                <ListItemText primary={user.name} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Container>
            <Container sx={{ width: '65%', m: 0, paddingRight: 0, paddingLeft: 0 }}>
                {userChat._id ? (
                    <Box sx={{ flexGrow: 1, mr: 3, my: 2, p: 0 }}>

                        <AppBar position="static" sx={{ backgroundColor: '#5c7186' }}>
                            <Toolbar onClick={() => navigate(`/profile/${userChat._id}`)}>
                                <img src={`http://localhost:5000/${userChat.image}`} alt='user_profile' style={{ width: '50px', height: '50px' }} />
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'capitalize', ml: 1 }}>
                                    {userChat.name}
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <Card sx={{ mt: 1, minHeight: '90vh' }}>
                            <CardContent>
                                {notifications.map((notice) => (
                                    // (notice.senderId == id) ? (
                                    <Card sx={{ maxWidth: '50%', justifyContent: 'start', backgroundColor: '#cdd1d6c4', boxShadow: 'none', my: 2 }}>
                                        <CardContent sx={{ py: 1 }}>
                                            <Typography>{notice.message}</Typography>
                                        </CardContent>
                                        {/* <Typography>{msgReceived}</Typography> */}
                                    </Card>
                                    //     ) : (
                                    //         <Card sx={{ maxWidth: '50%', justifyContent:'end', backgroundColor: '#cdd1d6c4', boxShadow: 'none', my: 2 }}>
                                    //             <CardContent sx={{ py: 1 }}>
                                    //                 <Typography>{notice.message}</Typography>
                                    //             </CardContent>
                                    //             {/* <Typography>{msgReceived}</Typography> */}
                                    //         </Card>
                                    //     )
                                ))}

                            </CardContent>

                            <CardActions sx={{ align: 'bottom' }}>
                                <FormControl sx={{}} fullWidth variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        size='small'
                                        aria-describedby="outlined-weight-helper-text"
                                        onChange={(e) => { setMsg(e.target.value) }}
                                        sx={{ borderRadius: '10px' }}
                                    />
                                </FormControl>
                                <Button variant="outlined" sx={{ minWidth: '45px', bgcolor: '#5c7186', color: 'white', px: 0, py: 1, borderRadius: '50%' }} onClick={sendMsg}><SendIcon /></Button>
                            </CardActions>
                        </Card>


                        {/* <Box align='center' sx={{ m: 5 }}> */}
                        {/* <TextField
                        id="outlined-required"
                        label="Chat"
                        onChange={(e) => { setMsg(e.target.value) }}
                    />
                    <Button variant="contained" onClick={msgAction}>Send</Button> */}
                        {/* <Typography variant='h6'>Messages : </Typography>
                        <Typography>{msgReceived}</Typography> */}
                    </Box>
                ) : null}


            </Container>
        </Box>
    )
}