import React, { useState } from 'react';
import { IconButton, TextField, Button, CircularProgress, Typography } from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import './DocSearch.css';
import axios from 'axios';
import DocSearchResults from './DocSearchResults';

const DocSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBtnClicked, setBtnClicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [conversionResult, setConversionResult] = useState('');
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select a file before converting');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/api/file-converter/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setConversionResult(response.data.data); // Handle the conversion result
      setBtnClicked(true);
    } catch (err) {
      setError('File conversion failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setBtnClicked(false);
    setSelectedFile(null);
    setSearchQuery('');
  };

  return (
    <>
      {isBtnClicked ? (
        <DocSearchResults
          searchQuery={conversionResult}
          setBtnClicked={setBtnClicked}
          setSearchQuery={setSearchQuery}
        />
      ) : (
        <div className="doc-search">
          <div className="doc-content">
            <div className="logo">
              <h1 className="doc-heading" style={{ opacity: 1 }}>DocAnalyser</h1>
            </div>
            <form className="search-form" onSubmit={handleSearch}>
              <TextField
                className="search-input"
                placeholder="Select a file to convert"
                variant="outlined"
                value={searchQuery}
                fullWidth
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled
              />
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.html,.txt"
                style={{ marginTop: '20px', display: 'block' }}
              />
              <div style={{ marginTop: '10px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size="1rem" /> : <Search />}
                >
                  {loading ? 'Converting...' : 'Convert File'}
                </Button>
                <IconButton
                  onClick={handleCancel}
                  style={{ marginLeft: '10px' }}
                >
                  <Close />
                </IconButton>
              </div>
              {error && (
                <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                  {error}
                </Typography>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DocSearch;
