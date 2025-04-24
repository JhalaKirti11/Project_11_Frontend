
// import React, { useState } from "react";
// import {
//     Box,
//     Container,
//     IconButton,
//     Toolbar,
//     AppBar,
//     MenuItem,
//     Select,
//     TableContainer,
//     TextareaAutosize
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import FormatBoldIcon from "@mui/icons-material/FormatBold";
// import FormatItalicIcon from "@mui/icons-material/FormatItalic";
// import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';

// export const TextEditor = () => {
//     const [text, setText] = useState("");
//     const [isBold, setIsBold] = useState(false);
//     const [isUnderline, setIsUnderline] = useState(false);
//     const [isItalic, setIsItalic] = useState(false);
//     const [isLeft, setIsLeft] = useState(false);
//     const [isRight, setIsRight] = useState(false);
//     const [isCenter, setIsCenter] = useState(false);
//     const [isJustify, setIsJustify] = useState(false);
//     const [fontSize, setFontSize] = useState(12);

//     const handleText = (e) => {
//         setText(e.target.value);
//     };

//     const changeBold = () => setIsBold((prev) => !prev);
//     const changeUnderline = () => setIsUnderline((prev) => !prev);
//     const changeItalic = () => setIsItalic((prev) => !prev);

//     const changeLeft = () => {
//         setIsLeft(true);
//         setIsRight(false);
//         setIsCenter(false);
//         setIsJustify(false);
//     }
//     const changeRight = () => {
//         setIsLeft(false);
//         setIsRight(true);
//         setIsCenter(false);
//         setIsJustify(false);
//     };
//     const changeCenter = () => {
//         setIsLeft(false);
//         setIsRight(false);
//         setIsCenter(true);
//         setIsJustify(false);
//     }
//     const changeJustify = () => {
//         setIsLeft(false);
//         setIsRight(false);
//         setIsCenter(false);
//         setIsJustify(true);
//     }

//     return (
//         <Container maxWidth="lg">
//             <Box sx={{ flexGrow: 1 }}>
//                 <AppBar position="static" sx={{ background: '#dcdfe2' }}>
//                     <Toolbar>
//                         {/* <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
//                             <MenuIcon />
//                         </IconButton> */}

//                         <Select
//                             sx={{ width: 100 }}
//                             defaultValue={12}
//                             labelId="font-size-label"
//                             id="font-size-select"
//                             value={fontSize}
//                             onChange={(e)=> setFontSize(e.target.value)}
//                         >
//                             {[...Array(100)].map((_, index) => (
//                                 <MenuItem key={index + 1} value={index + 1}>
//                                     {index + 1}
//                                 </MenuItem>
//                             ))}
//                         </Select>

//                         <Box sx={{ flexGrow: 1 }} />
//                         <Box sx={{ display: { xs: "none", md: "flex" } }}>
//                             <IconButton onClick={changeLeft}>
//                                 <FormatAlignLeftIcon />
//                             </IconButton>
//                             <IconButton onClick={changeRight}>
//                                 <FormatAlignCenterIcon />
//                             </IconButton>
//                             <IconButton onClick={changeCenter}>
//                                 <FormatAlignRightIcon />
//                             </IconButton>
//                             <IconButton onClick={changeJustify}>
//                                 <FormatAlignJustifyIcon />
//                             </IconButton>
//                             <IconButton onClick={changeBold}>
//                                 <FormatBoldIcon />
//                             </IconButton>
//                             <IconButton onClick={changeItalic}>
//                                 <FormatItalicIcon />
//                             </IconButton>
//                             <IconButton onClick={changeUnderline}>
//                                 <FormatUnderlinedIcon />
//                             </IconButton>
//                         </Box>
//                     </Toolbar>
//                 </AppBar>
//             </Box>

//             <Box sx={{ flexGrow: 1 }}>
//                 {/* <TableContainer sx={{ width: '90%' }}> */}
//                     <TextareaAutosize
//                         aria-label="rich text area"
//                         minRows={20}
//                         placeholder="Enter Text Here..."
//                         style={{
//                             width: "96.5%",
//                             heigth:'500px',
//                             padding: 20,
//                             fontSize:`${fontSize}px`,
//                             fontWeight: isBold ? "bold" : "normal",
//                             fontStyle: isItalic ? "italic" : "normal",
//                             textDecoration: isUnderline ? "underline" : "none",
//                             textAlign: isJustify ? 'justify' : isRight ? 'center' : isCenter ? 'end' : 'start'
//                         }}
//                         value={text}
//                         onChange={handleText}
//                     />
//                 {/* </TableContainer> */}
//             </Box>
//         </Container>
//     );
// };

//---------------------------------------------------

// import React, { useState } from "react";
// import {
//   Box,
//   Container,
//   IconButton,
//   Toolbar,
//   AppBar,
//   MenuItem,
//   Select
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import FormatBoldIcon from "@mui/icons-material/FormatBold";
// import FormatItalicIcon from "@mui/icons-material/FormatItalic";
// import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
// import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
// import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
// import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
// import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";

// export const TextEditor = () => {
//   const [fontSize, setFontSize] = useState(12);

//   const handleText = (e) => {
//     // Optionally, handle any text change if you need to capture it
//   };

//   const formatText = (command) => {
//     document.execCommand(command, false, null);
//   };

//   const changeAlignment = (alignment) => {
//     document.execCommand("justify" + alignment, false, null);
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static" sx={{ background: '#dcdfe2' }}>
//           <Toolbar>
//             <Select
//               sx={{ width: 100 }}
//               defaultValue={12}
//               labelId="font-size-label"
//               id="font-size-select"
//               value={fontSize}
//               onChange={(e) => setFontSize(e.target.value)}
//             >
//               {[...Array(100)].map((_, index) => (
//                 <MenuItem key={index + 1} value={index + 1}>
//                   {index + 1}
//                 </MenuItem>
//               ))}
//             </Select>

//             <Box sx={{ flexGrow: 1 }} />
//             <Box sx={{ display: { xs: "none", md: "flex" } }}>
//               <IconButton onClick={() => changeAlignment("Left")}>
//                 <FormatAlignLeftIcon />
//               </IconButton>
//               <IconButton onClick={() => changeAlignment("Center")}>
//                 <FormatAlignCenterIcon />
//               </IconButton>
//               <IconButton onClick={() => changeAlignment("Right")}>
//                 <FormatAlignRightIcon />
//               </IconButton>
//               <IconButton onClick={() => changeAlignment("Justify")}>
//                 <FormatAlignJustifyIcon />
//               </IconButton>
//               <IconButton onClick={() => formatText("bold")}>
//                 <FormatBoldIcon />
//               </IconButton>
//               <IconButton onClick={() => formatText("italic")}>
//                 <FormatItalicIcon />
//               </IconButton>
//               <IconButton onClick={() => formatText("underline")}>
//                 <FormatUnderlinedIcon />
//               </IconButton>
//             </Box>
//           </Toolbar>
//         </AppBar>
//       </Box>

//       <Box sx={{ flexGrow: 1 }}>
//         <div
//           contentEditable={true}
//           style={{
//             width: "96.5%",
//             height: "500px",
//             padding: 20,
//             fontSize: `${fontSize}px`,
//             minHeight: "300px",
//             border: "1px solid #ccc",
//             outline: "none"
//           }}
//           onInput={handleText}
//         >
//           Enter Text Here...
//         </div>
//       </Box>
//     </Container>
//   );
// };

//-----------------------------------=====================================


import React, { useState } from "react";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
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
import Underline from '@tiptap/extension-underline';


export const TextEditor = () => {
    const [text, setText] = useState("");
    const [isBold, setIsBold] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [isCenter, setIsCenter] = useState(false);
    const [isJustify, setIsJustify] = useState(false);
    const [isFontSize, setIsFontSize] = useState(15);

    const editor = useEditor({
        extensions: [StarterKit, Underline],
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

                        <Select
                            sx={{ width: 100 }}
                            // defaultValue={12}
                            value={isFontSize}
                            labelId="font-size-label"
                            id="font-size-select"
                            onChange={(e) => setIsFontSize(e.target.value)}
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
                            <IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
                                <FormatBoldIcon />
                            </IconButton>
                            <IconButton onClick={() => editor.chain().focus().toggleItalic().run()}>
                                <FormatItalicIcon />
                            </IconButton>
                            <IconButton onClick={() => editor.chain().focus().toggleUnderline().run()}>
                                <FormatUnderlinedIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ flexGrow: 1,
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
                        height: isFontSize >= 28 ? 'auto' : '600px',
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