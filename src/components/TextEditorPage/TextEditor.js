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
import TextFormatOutlinedIcon from '@mui/icons-material/TextFormatOutlined';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';


export const TextEditor = () => {
  const [text, setText] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isCenter, setIsCenter] = useState(false);
  const [isJustify, setIsJustify] = useState(false);
  const [isFontSize, setIsFontSize] = useState(18);
  const [fontColor, setFontColor] = useState('');
  const [heading, setHeading] = useState('');

  const handleText = (e) => {
    setText(e.target.value);
  };
  const editorRef = useRef(null);

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
  const handleColor = (e) => {
    const selectedColor = e.target.value;
    setFontColor(selectedColor);
    document.execCommand('foreColor', false, selectedColor);
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

  // const handleColor = (e) => {
  //   console.log("color : " + e.target.value)
  //   setFontColor(e.target.value);
  // }

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
              sx={{ width: 100 }}
              defaultValue={12}
              value={heading}
              labelId="font-size-label"
              id="font-size-select"
              onChange={(e) => setHeading(e.target.value)}
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
            {/* ------------------------- Font Color ------------------------------- */}
            {/* <Select
                            variant="standard"
                            displayEmpty
                            disableUnderline
                            value={fontColor}
                            label="Font Color"
                            onChange={handleColor}
                            sx={{ width: 50, ml: 2 }}
                        >
                            <MenuItem value="" disabled >
                                <TextFormatOutlinedIcon sx={{ mt: 1, fill: '#585353de' }} />
                            </MenuItem>
                            <MenuItem value="Green">Green</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Yellow">Yellow</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                            <MenuItem value="Tomato">Tomato</MenuItem>
                            <MenuItem value="skyblue">Sky blue</MenuItem>
                            <MenuItem value="Black">Black</MenuItem>
                            <MenuItem value="Pink">Pink</MenuItem>
                        </Select> */}
            <Select
              variant="standard"
              displayEmpty
              disableUnderline
              value={fontColor}
              label="Font Color"
              onChange={handleColor}
              sx={{ width: 50, ml: 2 }}
            >
              <MenuItem value="" disabled>
                <TextFormatOutlinedIcon sx={{ mt: 1, fill: '#585353de' }} />
              </MenuItem>
              <MenuItem value="Green">Green</MenuItem>
              <MenuItem value="Blue">Blue</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Tomato">Tomato</MenuItem>
              <MenuItem value="skyblue">Sky blue</MenuItem>
              <MenuItem value="Black">Black</MenuItem>
              <MenuItem value="Pink">Pink</MenuItem>
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
              <IconButton onClick={changeStrike}>
                <StrikethroughSIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ flexGrow: 1, height: "600px", border: '1px solid black' }}>
        {/* <TextareaAutosize
                    aria-label="rich text area"
                    variant="standard"
                    placeholder="Enter Text Here..."
                    style={{
                        width: "96.5%",
                        margin: '10px 10px 10px 10px',
                        border: 'none',
                        color: `${fontColor}`,
                        fontSize: `${isFontSize}px`,
                        fontWeight: isBold ? "bold" : "normal",
                        fontStyle: isItalic ? "italic" : "normal",
                        textDecoration: isUnderline ? "underline" : "none",
                        textAlign: isJustify ? 'justify' : isRight ? 'center' : isCenter ? 'end' : 'start'
                    }}
                    value={text}
                    onChange={handleText}
                /> */}

        <div
          ref={editorRef}
          contentEditable
          style={{
            width: "96.5%",
            height: "100%",
            margin: '10px',
            outline: "none",
            fontSize: `${isFontSize}px`,
            color: fontColor,
            textAlign: isJustify ? 'justify' : isRight ? 'center' : isCenter ? 'end' : 'start',
          }}
        ></div>

      </Box>
    </Container>
  );
};