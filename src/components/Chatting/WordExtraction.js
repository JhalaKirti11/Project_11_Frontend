// PdfKeywordExtractor.js
import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';

// ✅ Correct worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const keywords = [
  'react', 'node.js', 'express', 'mongodb', 'developer', 'javascript', 'html', 'css',
  'full stack', 'api', 'git', 'java', 'bootstrap', 'j2se', 'github', 'certificate', 'education', 'project'
];

export const WordExtraction = () => {
  const [text, setText] = useState('');
  const [keywordsFound, setKeywordsFound] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file');
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let extractedText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      extractedText += pageText + ' ';
    }

    setText(extractedText);
    const lower = extractedText.toLowerCase();
    const matches = keywords.filter(word => lower.includes(word.toLowerCase()));
    setKeywordsFound(matches);
  };

  return (
    <Box p={3}>
      <Typography variant="h5">PDF Keyword Extractor</Typography>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {keywordsFound.length > 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">Matched Keywords:</Typography>
            <Typography>{keywordsFound.join(', ')}</Typography>
          </CardContent>
        </Card>
      )}

      {text && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">Extracted Text:</Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>{text}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

