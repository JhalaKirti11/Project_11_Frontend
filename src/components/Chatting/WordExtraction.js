import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export const WordExtraction = () => {
  const [text, setText] = useState('');
  const [matchedKeywords, setMatchedKeywords] = useState([]);

  const keywords = ['name', 'payment', 'due date', 'total', 'tax', 'customer', 'email', 'Experience', 'react', 'node.js', 'express', 'mongodb', 'developer', 'javascript', 'html', 'css', 'full stack', 'api', 'git', 'java', 'bootstrap', 'j2se', 'github', 'certificate', 'education', 'project', "Managed", "Led", "Developed", "Created", "Designed", "Implemented", "Coordinated", "Improved", "Streamlined", "Analyzed", "Executed", "Delivered", "Facilitated", "Resolved", "Achieved", "Project Management", "Communication", "Team Leadership", "Problem Solving", "Strategic Planning", "Time Management", "Conflict Resolution", "Customer Service", "Data Analysis", "SQL", "Python", "Java", "Excel", "Power BI", "Cloud Computing", "Networking", "UI/UX Design", "Agile", "Scrum", "SEO", "SEM", "Campaign Management", "Content Strategy", "Social Media Analytics", "Brand Development", "Budgeting", "Financial Reporting", "Forecasting", "Risk Analysis", "Cost Reduction", "DevOps", "API Integration", "Version Control", "Git", "CI/CD Pipelines", "Systems Architecture", "PMP", "AWS Certified", "Google Analytics", "Salesforce", "Tableau", "Six Sigma", "AutoCAD", "Microsoft Office Suite", "Jira", "Confluence", "Increased revenue by X%", "Reduced costs by X%", "Boosted customer retention", 'GPA', 'Invoice', "Enhanced operational efficiency", "Software Developer", "Surpassed performance targets", "Met or exceeded KPIs"];

  const extractText = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      try {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;

        let extractedText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map(item => item.str).join(' ') + ' ';
        }
        resolve(extractedText);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    fileReader.readAsArrayBuffer(file);
  });
};


  const extractDocxText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;
    return text;
  };

  const findMatchingKeywords = (text) => {
    const lowerText = text.toLowerCase();
    const textList = keywords.filter((words) =>
      lowerText.includes(words.toLowerCase())
    )
    setMatchedKeywords(textList);
  }


  const handleFileChange = async (event) => {
    let text2;
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      text2 = await extractText(file);
    } else if (file && (file.name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      text2 = await extractDocxText(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
    console.log("Text : " + text2)
    setText(text2);
    findMatchingKeywords(text2)
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>PDF Text & Keyword Extractor</h2>

      <input type="file" accept=".pdf, .docx" onChange={handleFileChange} />

      {matchedKeywords.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Matched Keywords:</h3>
          <p>{matchedKeywords.join(', ')}</p>
        </div>
      )}

      {text && (
        <div style={{ marginTop: '20px' }}>
          <h3>Extracted Text:</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
        </div>
      )}
    </div>
  );
};
