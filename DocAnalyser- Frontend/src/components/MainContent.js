import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const MainContent = ({ searchKeywords }) => {
    const [query, setQuery] = useState(searchKeywords.join(' '));
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(" searchKeywords: ",searchKeywords);
    console.log(" query: ",query);

    // Function to fetch search results from Google Custom Search API
    const fetchResults = async (searchQuery) => {
        const apiKey = 'AIzaSyAU5ciZZOBDcIvSiCizJzZRJp2sdLvbifU';
        const cx = '01772dfd68c0d4dd2';

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: apiKey,
                    cx: cx,
                    q: searchQuery,
                },
            });
            setResults(response.data.items || []);
        } catch (err) {
            setError("Failed to fetch search results.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch initial search results when the component loads
    useEffect(() => {
        setQuery(searchKeywords.join(' '));
    }, [searchKeywords]);

    useEffect(()=>{
        fetchResults(query);
    },[query]);

    // Handle search button click or "Enter" key press
    const handleSearch = () => {
        fetchResults(query);
    };

    return (
        <Box sx={{ height: '100%', padding: 2, backgroundColor: '#f5f5f5' }}>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: 2,
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    color="textPrimary"
                    sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 2 }}
                >
                    Search Results
                </Typography>

                {/* Search Bar */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSearch();
                        }}
                        sx={{ backgroundColor: '#ffffff' }}
                    />
                    <IconButton onClick={handleSearch} sx={{ ml: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </Box>

                {loading && <Typography>Loading...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                
                {!loading && !error && results.length > 0 && (
                    <List>
                        {results.map((result, index) => (
                            <React.Fragment key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={
                                            <a href={result.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1a0dab', fontWeight: 'bold' }}>
                                                {result.title}
                                            </a>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="body2" color="textSecondary">
                                                    {result.snippet}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {result.displayLink}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                {index < results.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                )}

                {!loading && !error && results.length === 0 && (
                    <Typography>No results found.</Typography>
                )}
            </Paper>
        </Box>
    );
};

export default MainContent;
