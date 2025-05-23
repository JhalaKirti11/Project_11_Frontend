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
import { Typography } from '@mui/material';

export function Home() {
    const [image, setImage] = useState({ preview: "", raw: "" });

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    const handleUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image.raw);

        await fetch("YOUR_URL", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData
        });
    };

    return (
        <div>
            <label htmlFor="upload-button">
                {image.preview ? (
                    <img src={image.preview} alt="dummy" width="300" height="300" />
                ) : (
                    <>
                        <span className="fa-stack fa-2x mt-3 mb-2">
                            <i className="fas fa-circle fa-stack-2x" />
                            <i className="fas fa-store fa-stack-1x fa-inverse" />
                        </span>
                        <h5 className="text-center">Upload your photo</h5>
                    </>
                )}
            </label>
            <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChange}
            />
            <br />
            {/* <button onClick={handleUpload}>Upload</button> */}
        </div>
    );
}