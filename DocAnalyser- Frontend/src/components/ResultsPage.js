import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import axios from 'axios';

const ResultsPage = () => {
    const [searchKeywords, setSearchKeywords] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const handleKeywordsChange = (selectedKeywords) => {
        setSearchKeywords(selectedKeywords);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlToAnalyze = queryParams.get('url');

        if (urlToAnalyze) {
            const fetchKeywords = async () => {
                try {
                    const response = await axios.post('http://localhost:8080/text-processor/analyze-url', { url: urlToAnalyze });
                    setKeywords(response.data);
                } catch (error) {
                    console.error("Error fetching data from /text-processor/analyze-url:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchKeywords();
        } else {
            setLoading(false);
        }
    }, [location.search]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={12} md={4} sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
                <Sidebar 
                    keywords={keywords} 
                    sourceTopics={[]} 
                    onKeywordsChange={handleKeywordsChange} 
                />
            </Grid>
            <Grid item xs={12} md={8} sx={{ padding: 2 }}>
                <MainContent searchKeywords={searchKeywords} />
            </Grid>
        </Grid>
    );
};

export default ResultsPage;
