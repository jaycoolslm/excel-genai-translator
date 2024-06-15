// src/App.js
import React, { useState } from 'react';
import ApiKeyInput from './components/ApiKeyInput';
import FileUpload from './components/FileUpload';
import translateCsvData from './translateCsvData';
import { Container, Typography, Paper, Button } from '@mui/material';
import { CSVLink } from "react-csv";

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [csvData, setCsvData] = useState([]);
  const [translatedData, setTranslatedData] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleTranslate = async () => {
    if (apiKey && csvData.length > 0) {
      setIsTranslating(true);
      const result = await translateCsvData(csvData, apiKey, model);
      setTranslatedData(result);
      setIsTranslating(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '30px' }}>
        {apiKey ? (
          <FileUpload setCsvData={setCsvData} />
        ) : (
          <ApiKeyInput setApiKey={setApiKey} setModel={setModel} />
        )}
      </Paper>
      {csvData.length > 0 && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTranslate}
            disabled={isTranslating}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            {isTranslating ? 'Translating...' : 'Translate'}
          </Button>
          <Paper elevation={3} style={{ padding: '30px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
              CSV Data
            </Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {JSON.stringify(showMore ? csvData : csvData.slice(0, 5), null, 2)}
            </pre>
            <Button onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show Less' : 'Click to See More'}
            </Button>
          </Paper>
        </>
      )}
      {translatedData.length > 0 && (
        <Paper elevation={3} style={{ padding: '30px', marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Translated CSV Data
          </Typography>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(showMore ? translatedData : translatedData.slice(0, 5), null, 2)}
          </pre>
          <Button onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Click to See More'}
          </Button>
          <CSVLink data={translatedData} filename={"translated_data.csv"} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" fullWidth style={{ marginTop: '20px' }}>
              Download Translated CSV
            </Button>
          </CSVLink>
        </Paper>
      )}
    </Container>
  );
};

export default App;
