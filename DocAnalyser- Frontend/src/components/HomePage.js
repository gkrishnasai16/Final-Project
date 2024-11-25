import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";
import docAnalyzerBG from "./docAnalyzerBG.jpg"; // Import the background image

const HomePage = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleUrlSubmit = async (event) => {
    event.preventDefault();
    navigate(`/results?url=${encodeURIComponent(url)}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${docAnalyzerBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          padding: 4,
          width: '50%',
          maxWidth: 400,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" component="h1" color="textPrimary">
          DocAnalyser
        </Typography>
        <Box component="form" onSubmit={handleUrlSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Enter URL to analyze"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Analyze
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;
