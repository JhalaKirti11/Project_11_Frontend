import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, CardActions, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Container, TextField, Typography, AppBar, Toolbar, FormControl, OutlinedInput, Grid, Paper } from "@mui/material";
import Person3Icon from '@mui/icons-material/Person3';
import SendIcon from '@mui/icons-material/Send';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark'),
}));
const socket = io.connect("http://localhost:5000");

export const Message = () => {
    const [usersData, setUsersData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([])

    const [userChat, setUserChat] = useState({});
    const [notifications, setNotifications] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [msg, setMsg] = useState('');
    const [msgReceived, setMsgReceived] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState("");

    const token = useSelector((state) => state.user.token);
    const id = useSelector((state) => state.user._id);
    const name = useSelector((state) => state.user.name);

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
        // getChats();

        socket.on('receive_message', (data) => {
            setMsgReceived(data.message);
            if (userChat._id)
                getChats(userChat._id);
        })
        socket.on('typing', (data) => {
            console.log("typing data : ", data + " data.name : " + data.name)
            setIsTyping(true);
            setTypingUser(data.name);
        })

        socket.on('stopped-typing', () => {
            setIsTyping(false);
            setTypingUser("");
        })

        return () => {
            socket?.off("typing");
            socket?.off("stopped-typing");
        };

    }, [userChat, typingUser, isTyping]);

    useEffect(() => {
        let timer;
        if (msg) {
            timer = setTimeout(() => {
                socket.emit('stopped-typing', {
                    from: { id, username: name },
                    to: userChat._id
                });
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [msg]);

    useEffect(() => {
        socket.emit("register-user", id);
    }, [id]);


    useEffect(() => {
        let filtered = usersData;
        if (searchQuery) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredUsers(filtered)
    }, [searchQuery, usersData]);

    const handleChange = (e) => {

        setMsg(e.target.value);
        console.log("Changes handling...")
        // socket.emit("typing", { user: { id: id, username: name }, typing: true });

        socket.emit("typing", {
            from: { id, username: name },
            to: userChat._id
        });
        console.log("Changes emitted...")
    }

    const sendMsg = async () => {
        try {
            const send = await axios.post(`http://localhost:5000/chat/sendMsg/${id}`, {
                receiverId: userChat._id,
                message: msg
            });
            if (send) {
                console.log("message send" + send);
                console.log("extra : " + send.data.msg);
                socket.emit('user-message', { message: msg });
                setMsg('');
                getChats(userChat._id);
                console.log("Done dude.")
            }
        } catch (error) {
            console.log("Error duringsending message:", error);
            console.log("Can not send the Message!");
        }
    }

    const getChats = async (receiverId) => {
        try {
            console.log("Id : " + id)
            setIsTyping(false)
            const res = await axios.get(`http://localhost:5000/chat/viewChat/${id}`);
            if (res) {
                const filteredNotifications = res.data.messages.filter((notice) => (
                    (notice.senderId === id && notice.receiverId === receiverId) || (notice.receiverId === id && notice.senderId === receiverId)
                ))
                console.log("Your notifications are here : " + filteredNotifications);
                setNotifications(filteredNotifications);
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
    const showChat = async (user) => {
        console.log("Here is the user : " + user.name + " notfications : " + user.notification)
        setUserChat(user);
        getChats(user._id);
    }

    return (
        <Box sx={{ display: 'flex', bgcolor: '#b9d6f0a1' }}>
            <Container sx={{ width: '40%', m: 0 }}>
                <Box sx={{ ml: 3, my: 2, bgcolor: '#ffffff', borderRadius: '4px', height: '90vh', overflow: 'auto' }}>
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
                                <ListItemText>
                                    <Typography>{user._id === id ? (
                                        user.name + ' (You)'
                                    ) : (user.name)}
                                        <Typography display='block' sx={{ fontSize: '14px', textTransform: 'lowercase', color: 'green', fontWeight: 600, mt: 0 }}>{(isTyping && user.name === typingUser) && `typing...`}</Typography>
                                    </Typography>

                                    {/* {user._id === id ? (
                                        <Typography>{user.name} (You)</Typography>
                                    ) : (
                                        <Typography>{user.name}</Typography>
                                    )} */}

                                </ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Container>
            <Container sx={{ width: '65%', m: 0, paddingRight: 0, paddingLeft: 0 }}>
                {userChat._id ? (
                    <Box sx={{ mr: 3, my: 2, p: 0 }}>

                        <AppBar position="static" sx={{ backgroundColor: '#5c7186' }}>
                            <Toolbar onClick={() => navigate(`/profile/${userChat._id}`)}>
                                <Grid container spacing={2}>
                                    <Grid size={5}>
                                        <img src={`http://localhost:5000/${userChat.image}`} alt='user_profile' style={{ width: '50px', height: '50px' }} />
                                    </Grid>
                                    <Grid size={5}>
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'capitalize', mt: 1 }}>
                                            {userChat._id === id ? (
                                                userChat.name + ' (You)'
                                            ) : (
                                                userChat.name
                                            )}
                                            <Typography display='block' sx={{ fontSize: '14px', textTransform: 'lowercase', mt: 0 }}>{(isTyping && userChat.name === typingUser) && `typing...`}</Typography>

                                        </Typography>
                                    </Grid>
                                </Grid>



                            </Toolbar>
                        </AppBar>

                        <Card sx={{
                            height: '74vh', overflow: 'auto', borderBottom: 0, borderRadius: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.9)), url(../assets/emoji_background.jpg)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}>
                            <CardContent>
                                {notifications.length > 0 ? (
                                    notifications.map((notice) => (
                                        // (notice.senderId == id) ? (
                                        <Card sx={{ maxWidth: '50%', bgcolor: notice.senderId === id ? '#79f0a8bd' : '#c4bebe', ml: notice.senderId === id ? 'auto' : 0, boxShadow: 'none', my: 2 }}>

                                            <CardContent sx={{ py: 1 }}>
                                                <Typography>{notice.message}</Typography>
                                            </CardContent>
                                        </Card>

                                        //     ) : (
                                        //         <Card sx={{ maxWidth: '50%', justifyContent:'end', backgroundColor: '#cdd1d6c4', boxShadow: 'none', my: 2 }}>
                                        //             <CardContent sx={{ py: 1 }}>
                                        //                 <Typography>{notice.message}</Typography>
                                        //             </CardContent>
                                        //             {/* <Typography>{msgReceived}</Typography> */}
                                        //         </Card>
                                        //     )

                                    ))
                                ) : (
                                    <Box sx={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.8)), url(../assets/emoji_background.jpg)`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover'
                                    }}></Box>
                                    // <img src='/assets/emaoji_background.jpg' alt='user_profile' style={{ width: '100%', height: '100%' }} />
                                )}
                            </CardContent>
                            {/* 
                            <CardActions sx={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
                                <FormControl sx={{}} fullWidth variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        size='small'
                                        value={msg}
                                        aria-describedby="outlined-weight-helper-text"
                                        onChange={(e) => { setMsg(e.target.value) }}
                                        sx={{ borderRadius: '10px', border:'1px solid #5c7186' }}
                                    />
                                </FormControl>
                                <Button variant="outlined" sx={{ minWidth: '45px', bgcolor: '#5c7186', color: 'white', px: 0, py: 1, borderRadius: '50%' }} onClick={sendMsg}><SendIcon /></Button>
                            </CardActions> */}
                        </Card>
                        <Box sx={{ display: 'flex', bgcolor: '#ffffff' }}>
                            <FormControl sx={{ ml: 2, mr: 1, mt: 1, mb: 2 }} fullWidth variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    size='small'
                                    value={msg}
                                    aria-describedby="outlined-weight-helper-text"
                                    onChange={handleChange}
                                    sx={{ borderRadius: '10px', border: '1px solid #5c7186' }}
                                />
                            </FormControl>
                            <Button variant="outlined" sx={{ minWidth: '45px', bgcolor: '#5c7186', color: 'white', px: 0, py: 1, ml: 1, mr: 2, mt: 1, mb: 2, borderRadius: '50%' }} onClick={sendMsg}><SendIcon /></Button>
                        </Box>
                    </Box>
                ) : null}
            </Container>
        </Box>
    )
}