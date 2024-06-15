// src/components/ApiKeyInput.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const ApiKeyInput = ({ setApiKey, setModel }) => {
  const [key, setKey] = useState('');
  const [model, setModelState] = useState('gpt-3.5-turbo');

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiKey(key);
    setModel(model);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Enter OpenAI API Key and Select Model
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="API Key"
          variant="outlined"
          fullWidth
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Model</InputLabel>
          <Select
            value={model}
            onChange={(e) => setModelState(e.target.value)}
            label="Model"
          >
            <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
            <MenuItem value="gpt-4">GPT-4</MenuItem>
            <MenuItem value="gpt-4o">GPT-4o</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save API Key and Model
        </Button>
      </form>
    </Container>
  );
};

export default ApiKeyInput;
