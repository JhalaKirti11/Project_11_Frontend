import React, { useState } from "react";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';

import { Box, Container, IconButton, Toolbar, AppBar, MenuItem, Select, TableContainer, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughOutlinedIcon from '@mui/icons-material/FormatStrikethroughOutlined';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import TextFormatOutlinedIcon from '@mui/icons-material/TextFormatOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';

export const Editor = () => {
    const [text, setText] = useState("");
    // const [isBold, setIsBold] = useState(false);
    // const [isUnderline, setIsUnderline] = useState(false);
    // const [isItalic, setIsItalic] = useState(false);
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [isCenter, setIsCenter] = useState(false);
    const [isJustify, setIsJustify] = useState(false);
    const [isFontSize, setIsFontSize] = useState(15);

    const editor = useEditor({
        extensions: [StarterKit, Underline, Strike, TextStyle, FontFamily, Color, Highlight.configure({ multicolor: true }), Heading, ListItem, OrderedList, BulletList],
    });

    if (!editor) return null;

    const handleText = (e) => {
        setText(e.target.value);
    };

    // const changeBold = () => setIsBold((prev) => !prev);
    // const changeUnderline = () => setIsUnderline((prev) => !prev);
    // const changeItalic = () => setIsItalic((prev) => !prev);

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

                        {/* ----------------------  Font Size ----------------------- */}
                        <Select
                            // defaultValue={12}
                            variant="standard"
                            disableUnderline
                            label='Size'
                            value={isFontSize}
                            labelId="font-size-label"
                            id="font-size-select"
                            onChange={(e) => setIsFontSize(e.target.value)}
                            sx={{ width: 52, ms: 1 }}
                        >
                            {[...Array(100)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography variant='h5' sx={{ color: '#494949', mx: 1 }}>|</Typography>

                        {/* --------------------------- Font Family -------------------------------- */}
                        <Select
                            sx={{ width: 80, ms: 1 }}
                            variant="standard"
                            disableUnderline
                            displayEmpty
                            value={editor.getAttributes('textStyle').fontFamily || ''}
                            label="Font Style"
                            onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                        >
                            {/* {[...Array(100)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))} */}
                            <MenuItem value="" disabled>
                                Styles
                            </MenuItem>
                            <MenuItem value="Poppins">Poppins</MenuItem>
                            <MenuItem value="Arial Narrow">Arial</MenuItem>
                            <MenuItem value="'Franklin Gothic Medium'">Franklin Gothic</MenuItem>
                            <MenuItem value="'MV Boli'">MV Boli</MenuItem>
                            <MenuItem value="'Segoe Script'">Segoe Script</MenuItem>
                            <MenuItem value="'Script'">Script</MenuItem>
                            <MenuItem value="'Dancing Script'">Dancing Script</MenuItem>
                            <MenuItem value="'Red Rose'">Red Rose</MenuItem>
                            <MenuItem value="'Times New Roman'">Times New Roman</MenuItem>
                            <MenuItem value='Inter'>Inter</MenuItem>
                            <MenuItem value="'Comic Sans MS', Comic Sans">Comic Sans</MenuItem>
                            <MenuItem value="serif">Serif</MenuItem>
                            <MenuItem value="monospace">Monospace</MenuItem>
                            <MenuItem value="cursive">Cursive</MenuItem>
                            <MenuItem value="'Exo 2'">Exo 2</MenuItem>
                        </Select>

                        <Typography variant='h5' sx={{ color: '#494949', mx: 1 }}>|</Typography>

                        {/* ---------------------- Font Color ---------------------------------- */}
                        <Select
                            variant="standard"
                            displayEmpty
                            disableUnderline
                            value={editor.getAttributes('TextStyle').color || ''}
                            label="Font Color"
                            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                            sx={{ width: 48 }}
                        > {/* {[...Array(100)].map((_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))} */}
                            <MenuItem value="" disabled >
                                <TextFormatOutlinedIcon sx={{ mt: 1, fill: '#585353de' }} />
                            </MenuItem>
                            <MenuItem value="none">None</MenuItem>
                            <MenuItem value="Green">Green</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Yellow">Yellow</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                            <MenuItem value="Tomato">Tomato</MenuItem>
                            <MenuItem value="skyblue">Sky blue</MenuItem>
                            <MenuItem value="Black">Black</MenuItem>
                            <MenuItem value="Pink">Pink</MenuItem>
                        </Select>
                        {/* <Typography variant='h5' sx={{ color: '#494949', mx: 1 }}>|</Typography> */}

                        {/* ----------------- Hightlight ----------------------- */}
                        <Select
                            variant="standard"
                            displayEmpty
                            disableUnderline
                            value={editor.getAttributes('TextStyle').color || ''}
                            label="Font Color"
                            onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
                            sx={{ width: 48 }}
                        > {/* {[...Array(100)].map((_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))} */}
                            <MenuItem value="" disabled >
                                <FontDownloadIcon sx={{ mt: 1, fill: '#585353de' }} />
                            </MenuItem>
                            <MenuItem value="#ffffff">None</MenuItem>
                            <MenuItem value="Green">Green</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Yellow">Yellow</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                            <MenuItem value="Tomato">Tomato</MenuItem>
                            <MenuItem value="skyblue">Sky blue</MenuItem>
                            <MenuItem value="Black">Black</MenuItem>
                            <MenuItem value="Pink">Pink</MenuItem>
                        </Select>
                        <Typography variant='h5' sx={{ color: '#494949', mx: 1 }}>|</Typography>

                        {/* ----------------- Heading --------------------------- */}
                        <Select
                            // defaultValue={12}
                            variant="standard"
                            disableUnderline
                            displayEmpty
                            value={editor.getAttributes('textStyle').heading || ''}
                            label="Heading"
                            onChange={(e) => editor.chain().focus().toggleHeading({ level: e.target.value }).run()}
                            sx={{ width: 50 }}
                        >
                            {[...Array(7)].map((_, index) => (
                                index === 0 ? (
                                    <MenuItem value="" disabled>
                                        <FormatSizeOutlinedIcon sx={{ mt: 1, fill: '#585353de' }} />
                                    </MenuItem>
                                ) : (
                                    <MenuItem key={index} value={index}>
                                        {index}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                        <Typography variant='h5' sx={{ color: '#494949', ml: 1 }}>|</Typography>

                        <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
                            <FormatListBulletedOutlinedIcon />
                        </IconButton>

                        <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                            <FormatListNumberedOutlinedIcon />
                        </IconButton>

                        {/* <IconButton onClick={() => editor.chain().focus().splitListItem().run()}>
                            <FormatBoldIcon />
                        </IconButton> */}

                        <Typography variant='h5' sx={{ color: '#494949' }}>|</Typography>

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
                            <IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
                                <FormatBoldIcon />
                            </IconButton>
                            <IconButton onClick={() => editor.chain().focus().toggleItalic().run()}>
                                <FormatItalicIcon />
                            </IconButton>
                            <IconButton onClick={() => editor.chain().focus().toggleUnderline().run()}>
                                <FormatUnderlinedIcon />
                            </IconButton>
                            <IconButton onClick={() => editor.chain().focus().toggleStrike().run()}>
                                <FormatStrikethroughOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{
                flexGrow: 1,
                '& .ProseMirror': {
                    height: '100%',
                    outline: 'none',
                    border: 'none',
                    padding: 2,
                    boxShadow: 'none',
                },
                '& .ProseMirror-focused': {
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                },
            }}>
                {/* <TableContainer sx={{ width: '90%' }}> */}
                <EditorContent editor={editor}
                    placeholder="Enter Text Here..."
                    style={{
                        width: "96.5%",
                        height: '500px',
                        padding: 20,
                        border: '1px solid #c3bdbd',
                        fontSize: `${isFontSize}px`,
                        // fontWeight: isBold ? "bold" : "normal",
                        // fontStyle: isItalic ? "italic" : "normal",
                        // textDecoration: isUnderline ? "underline" : "none",
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
