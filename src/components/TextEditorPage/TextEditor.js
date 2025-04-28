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


//---------------------------------------------------------
import React, { useState, useRef } from "react";
import {
    Box,
    Container,
    IconButton,
    Toolbar,
    AppBar,
    MenuItem,
    Select,
    TextareaAutosize,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import TextFormatOutlinedIcon from '@mui/icons-material/TextFormatOutlined';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export const TextEditor = () => {
    const [text, setText] = useState("");
    const [isBold, setIsBold] = useState(false);
    // const [isUnderline, setIsUnderline] = useState(false);
    // const [isItalic, setIsItalic] = useState(false);
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [isCenter, setIsCenter] = useState(false);
    const [isJustify, setIsJustify] = useState(false);
    const [isFontSize, setIsFontSize] = useState(18);
    const [fontColor, setFontColor] = useState('');
    const [highlightColor, setHighlightColor] = useState('');
    const [heading, setHeading] = useState('');
    const [style, setStyle] = useState('');
      const [content, setContent] = useState([]);
    
    const editorRef = useRef();
    const handleText = (e) => {
        setText(e.target.value);
    };


    const changeBold = () => {
        document.execCommand('bold', false, null);
    };
    const changeItalic = () => {
        document.execCommand('italic', false, null);
    };
    const changeUnderline = () => {
        document.execCommand('underline', false, null);
    };
    const changeStrike = () => {
        document.execCommand('strikeThrough', false, null);
    };
    const handleOrderedList = ()=>{
        document.execCommand('insertOrderedList');
    }
    const handleUnorderedList = ()=>{
        document.execCommand('insertUnorderedList');
    }
    
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

    // ----------------- set font family ---------------------------
    const handleStyle = (e) =>{
        console.log("style : "+e.target.value);
        document.execCommand('fontName', false, e.target.value)  
    }
    const handleHeading = (e) => {
        console.log("foreSize : " + e.target.value)
        // setFontHeading(e.target.value);
        document.execCommand('formatBlock', false, `h${e.target.value}`);
    }

    const handleColor = (e) => {
        const selectedColor = e.target.value;
        document.execCommand('foreColor', false, selectedColor);
    };

    const handleBackground = (e) => {
        const selectedColor = e.target.value;
        document.execCommand('backColor', false, selectedColor);
    };

    const insertImage = (url) => {
        setContent((prevContent) => [
            ...prevContent,
            { type: 'image', src: url }
        ]);
    };

    const handleImageClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
    
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageUrl = reader.result;
                    insertImage(imageUrl);
                };
                reader.readAsDataURL(file);
            }
        };    
        fileInput.click();
    };
    

    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: '#dcdfe2' }}>
                    <Toolbar>
                        {/* <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton> */}
                        <Select
                            variant="standard"
                            disableUnderline
                            sx={{ width: 54 }}
                            defaultValue={12}
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

                        {/* ------------------------- Heading --------------------- */}
                        <Select
                            variant="standard"
                            disableUnderline
                            displayEmpty
                            sx={{ width: 54, ml: 2 }}
                            // defaultValue={1}
                            value={heading}
                            labelId="font-size-label"
                            id="font-size-select"
                            onChange={handleHeading}
                        >
                            {[...Array(7)].map((_, index) => (
                                index === 0 ? (
                                    <MenuItem value="" disabled>
                                        <TextFieldsIcon sx={{ mt: 1, fill: '#585353de' }} />
                                    </MenuItem>
                                ) : (
                                    <MenuItem key={index} value={index}>
                                        {index}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                        {/* ------------------------- Font Color ------------------------------- */}
                        <Select
                            variant="standard"
                            displayEmpty
                            disableUnderline
                            value={fontColor}
                            label="Font Color"
                            onChange={handleColor}
                            // onChange={changeColor}
                            sx={{ width: 50, ml: 2 }}
                        >
                            <MenuItem value="" disabled >
                                <TextFormatOutlinedIcon sx={{ mt: 1, fill: '#585353de' }} />
                            </MenuItem>
                            <MenuItem value="black">None</MenuItem>
                            <MenuItem value="Green">Green</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Yellow">Yellow</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                            <MenuItem value="Tomato">Tomato</MenuItem>
                            <MenuItem value="skyblue">Sky blue</MenuItem>
                            <MenuItem value="Pink">Pink</MenuItem>
                            <MenuItem value="Black">Black</MenuItem>
                            <MenuItem value="White">White</MenuItem>
                        </Select>

                        {/* --------------------- Highlight ------------------------ */}
                        <Select
                            variant="standard"
                            displayEmpty
                            disableUnderline
                            value={highlightColor}
                            label="Highlight Color"
                            onChange={handleBackground}
                            sx={{ width: 50, ml: 2 }}
                        >
                            <MenuItem value="" disabled>
                                <FontDownloadIcon sx={{ mt: 1, fill: '#585353de' }} />
                            </MenuItem>
                            <MenuItem value="white">None</MenuItem>
                            <MenuItem value="Yellow">Yellow</MenuItem>
                            <MenuItem value="Orange">Orange</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                            <MenuItem value="Black">Black</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Neon">Neon</MenuItem>
                            <MenuItem value="LightGreen">Light Green</MenuItem>
                            <MenuItem value="LightPink">Light Pink</MenuItem>
                            <MenuItem value="SkyBlue">Sky Blue</MenuItem>
                            <MenuItem value="LightGray">Light Gray</MenuItem>
                        </Select>


                        {/* --------------------- Font Style ------------------------ */}
                        <Select
                            variant="standard"
                            displayEmpty
                            disableUnderline
                            value={style}
                            label="Font Style"
                            onChange={handleStyle}
                            sx={{ width: 50, ml: 2 }}
                        >
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
                        <IconButton onClick={handleOrderedList}>
                                <FormatListNumberedOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={handleUnorderedList}>
                                <FormatListBulletedOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={handleImageClick}>
                                <AddPhotoAlternateIcon />
                            </IconButton>

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
                            <IconButton onClick={changeStrike}>
                                <StrikethroughSIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ flexGrow: 1, height: "600px", border: '1px solid black' }}>
                <div
                    ref={editorRef}
                    contentEditable
                    variant={heading}
                    style={{
                        width: "96.5%",
                        height: "100%",
                        margin: '10px',
                        outline: "none",
                        fontSize: `${isFontSize}px`,
                        color: { fontColor },
                        textAlign: isJustify ? 'justify' : isRight ? 'center' : isCenter ? 'end' : 'start',
                    }}
                >
                    {content.map((item, index) => {
                    if (item.type === 'image') {
                        return <img key={index} src={item.src} alt="Uploaded" style={{ maxWidth: '100%' }} />;
                    }
                    return <span key={index}>{item.text}</span>;
                })}</div>

            </Box>
        </Container>
    );
};
