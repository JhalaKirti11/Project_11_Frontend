
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import { Modal } from '@mui/material';

// import axios from "axios";

// export function Login() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({});
//     const [error, setError] = useState("");
//     const [openModal, setOpenModal] = useState(false);
//     const [modalMsg, setModalMsg] = useState('');


//     const handleChange = (e) => {
//         setFormData(prev => ({
//             ...prev,
//             [e.target.name]: e.target.value
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const { email, password } = formData;
//         let response;
//         if (!email || !password) {
//             setModalMsg("Please fill all fields!");
//             setOpenModal(true);
//             return;
//         }


//         if (!email.endsWith("@gmail.com")) {
//             setModalMsg("this is not a valid email id");
//             setOpenModal(true);
//             return;
//         }
//         try {
//             setError("");
//             response = await axios.post(`http://localhost:5000/user/login`, formData);

//             if (response.data.error) {
//                 setModalMsg(response.data.error);
//                 setOpenModal(true);
//                 return;
//             }
//             sessionStorage.setItem("token", response.data.token);
//             console.log("Token : " + response.data.token)
//             console.log("Sign In Response:", response.data);

//             setModalMsg("Login successful!");
//             setOpenModal(true);
//             setTimeout(() => {
//                 navigate("/userslist");
//             }, 1000);


//         } catch (error) {
//             console.log("Error during Sign In:", error);
//             setModalMsg("invalid email or password");
//             setOpenModal(true);
//         }
//     }

//     const visitRegister = () => {
//         navigate('/');
//     };

//     return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', height: 'auto', mt: 8 }}>
//             <Card sx={{ p: 3, width: 350 }}>
//                 <Typography variant="h6" style={{ textAlign: 'center' }}>Welcome User</Typography>
//                 <CardContent style={{ textAlign: 'center', paddingTop:'0' }}>
//                     <Typography gutterBottom sx={{ color: 'black', fontSize: 18, fontWeight: 600 }}>
//                         Login
//                     </Typography>

//                     <Box component="form" onSubmit={handleSubmit} sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         '& .MuiTextField-root': {
//                             m: 1,
//                             width: '100%',
//                         },
//                     }} noValidate autoComplete="off" >
//                         <TextField required name="email" label="Email" placeholder="Enter Email" value={formData.email || ''} onChange={handleChange}
//                         />
//                         <TextField required name="password" label="Password" type="password" placeholder="Enter Password" value={formData.password || ''} onChange={handleChange}
//                         />
//                         <CardActions>
//                             <Button type="submit" variant="contained">Login</Button>
//                             <Button variant="outlined" onClick={visitRegister}>Register</Button>
//                         </CardActions>
//                     </Box>


//                     <Modal
//                         open={openModal}
//                         onClose={() => setOpenModal(false)}
//                         aria-labelledby="modal-title"
//                         aria-describedby="modal-description"
//                     >
//                         <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', borderRadius: 0, boxShadow: 12, p: 2, textAlign: 'center'
//                         }}>
//                             <Typography id="modal-title" variant="h6" component="h2" color="black" fontWeight={800}>
//                                 Message
//                             </Typography>
//                             <Typography id="modal-description" sx={{ mt: 2 }}>
//                                 {modalMsg}
//                             </Typography>
//                             {/* <Button onClick={() => setOpenModal(false)} sx={{ mt: 2 }} variant="contained">
//                                 Close
//                             </Button> */}
//                         </Box>
//                     </Modal>
//                 </CardContent>
//             </Card>
//         </Box>
//     );
// }

//=================================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Card, CardActions, CardContent,
    Button, Typography, TextField, Modal
} from '@mui/material';
import axios from "axios";

export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        let hasError = false;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = "Email is required";
            hasError = true;
        } else if (!email.endsWith("@gmail.com")) {
            newErrors.email = "Invalid email address";
            hasError = true;
        }

        if (!password) {
            newErrors.password = "Password is required";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/user/login`, formData);
            // Inside try block, after axios.post...
            // if (response.data.error) {
            //     const errorMsg = response.data.error.toLowerCase();

            //     if (errorMsg.includes("incorrect password")) {
            //         setErrors({ password: "Incorrect password" });
            //     } else if (errorMsg.includes("email")) {
            //         setErrors({ email: "Email is not registered" });
            //     } else if (errorMsg.includes("invalid details")) {
            //         setErrors({
            //             email: "Invalid email",
            //             password: "Invalid password"
            //         });
            //     } else {
            //         setModalMsg(response.data.error);
            //         setOpenModal(true);
            //     }
            //     return;
            // }


            sessionStorage.setItem("token", response.data.token);
            setModalMsg("Login successful!");
            setOpenModal(true);
            setTimeout(() => navigate("/userslist"), 1500);
        } catch (error) {
            console.log("Login error:", error);
            const msg = error.response?.data?.error?.toLowerCase() || "Something went wrong";
        
            if (msg.includes("incorrect password")) {
                setErrors({ password: "Incorrect password" });
            } else if (msg.includes("email")) {
                setErrors({ email: "Email is not registered" });
            } else if (msg.includes("invalid details")) {
                setErrors({
                    email: "Invalid email",
                    password: "Invalid password"
                });
            } else {
                setModalMsg(msg);
                setOpenModal(true);
            }
        }
        
    };

    const visitRegister = () => {
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: 'auto', mt: 8 }}>
            <Card sx={{ p: 3, width: 350 }}>
                <Typography variant="h6" style={{ textAlign: 'center' }}>Welcome User</Typography>
                <CardContent sx={{ textAlign: 'center', pt: 0 }}>
                    <Typography gutterBottom sx={{ color: 'black', fontSize: 18, fontWeight: 600 }}>
                        Login
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            name="email"
                            label="Email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            required
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <CardActions>
                            <Button type="submit" variant="contained">Login</Button>
                            <Button variant="outlined" onClick={visitRegister}>Register</Button>
                        </CardActions>
                    </Box>

                    {/* Success/Error Modal */}
                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
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
                </CardContent>
            </Card>
        </Box>
    );
}
