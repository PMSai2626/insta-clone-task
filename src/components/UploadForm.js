// src/components/UploadForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const UploadForm = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleUpload = async () => {
    if (!photo) {
      alert('Please select a photo to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('description', description);

    try {
      await axios.post('http://localhost:5000/upload', formData);
      setDescription('');
      setPhoto(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        fullWidth
      >
        Upload
      </Button>
    </Box>
  );
};

export default UploadForm;
