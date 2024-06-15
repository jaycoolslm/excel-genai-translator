// src/components/FileUpload.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button, Container, Typography, Input } from '@mui/material';

const FileUpload = ({ setCsvData }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
        },
      });
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Upload CSV File
      </Typography>
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleFileUpload} fullWidth>
        Upload
      </Button>
    </Container>
  );
};

export default FileUpload;
