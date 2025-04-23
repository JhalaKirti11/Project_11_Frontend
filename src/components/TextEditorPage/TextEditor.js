
import React, { useState } from "react";
import {
    Box,
    Container,
    IconButton,
    Toolbar,
    AppBar,
    MenuItem,
    Select,
    TableContainer,
    TextareaAutosize
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';

export const TextEditor = () => {
    const [text, setText] = useState("");
    const [isBold, setIsBold] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [isCenter, setIsCenter] = useState(false);
    const [isJustify, setIsJustify] = useState(false);

    const handleText = (e) => {
        setText(e.target.value);
    };

    const changeBold = () => setIsBold((prev) => !prev);
    const changeUnderline = () => setIsUnderline((prev) => !prev);
    const changeItalic = () => setIsItalic((prev) => !prev);

    const changeLeft = () => {
        setIsLeft(true);
        setIsRight(false);
        setIsCenter(false);
        setIsJustify(false);
    }
    const changeRight = () => {
        setIsLeft(false);
        setIsRight(true);
        setIsCenter(false);
        setIsJustify(false);
    };
    const changeCenter = () => {
        setIsLeft(false);
        setIsRight(false);
        setIsCenter(true);
        setIsJustify(false);
    }
    const changeJustify = () => {
        setIsLeft(false);
        setIsRight(false);
        setIsCenter(false);
        setIsJustify(true);
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: '#dcdfe2' }}>
                    <Toolbar>
                        {/* <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton> */}

                        <Select
                            sx={{ width: 100 }}
                            defaultValue={12}
                            labelId="font-size-label"
                            id="font-size-select"
                        >
                            {[...Array(100)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </Select>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton onClick={changeLeft}>
                                <FormatAlignLeftIcon />
                            </IconButton>
                            <IconButton onClick={changeRight}>
                                <FormatAlignCenterIcon />
                            </IconButton>
                            <IconButton onClick={changeCenter}>
                                <FormatAlignRightIcon />
                            </IconButton>
                            <IconButton onClick={changeJustify}>
                                <FormatAlignJustifyIcon />
                            </IconButton>
                            <IconButton onClick={changeBold}>
                                <FormatBoldIcon />
                            </IconButton>
                            <IconButton onClick={changeItalic}>
                                <FormatItalicIcon />
                            </IconButton>
                            <IconButton onClick={changeUnderline}>
                                <FormatUnderlinedIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                {/* <TableContainer sx={{ width: '90%' }}> */}
                    <TextareaAutosize
                        aria-label="rich text area"
                        minRows={20}
                        placeholder="Enter Text Here..."
                        style={{
                            width: "96.5%",
                            heigth:'500px',
                            padding: 20,
                            fontWeight: isBold ? "bold" : "normal",
                            fontStyle: isItalic ? "italic" : "normal",
                            textDecoration: isUnderline ? "underline" : "none",
                            textAlign: isJustify ? 'justify' : isRight ? 'center' : isCenter ? 'end' : 'start'
                        }}
                        value={text}
                        onChange={handleText}
                    />
                {/* </TableContainer> */}
            </Box>
        </Container>
    );
};
