import React, { useState, useEffect } from "react";
import { IconButton, TextField, Typography, CircularProgress, Button } from '@mui/material';
import { Search, Close, ArrowBack } from '@mui/icons-material';
import './DocSearchResults.css';

const DocSearchResults = ({ searchQuery, setSearchQuery, setBtnClicked }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Example search results (simulating API results)
    const fakeResults = [
        { title: "Result 1", link: "https://example.com/1", description: "Description for result 1" },
        { title: "Result 2", link: "https://example.com/2", description: "Description for result 2" },
        { title: "Result 3", link: "https://example.com/3", description: "Description for result 3" },
    ];

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            handleSearch();  // Automatically run the search on load
        }
    }, [searchQuery]);

    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            setResults(fakeResults);  // In real application, fetch results from an API
            setLoading(false);
        }, 1000);  // Simulating API delay
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== "") {
            handleSearch();
        }
    };

    const handleCancel = () => {
        setBtnClicked(false); // Go back to the file upload page
        setSearchQuery('');   // Clear the search query
    };

    const handleBack = () => {
        setBtnClicked(false); // Back to previous page or state
    };

    return (
        <div className="pageContainer">
            <div className="layout">
                {/* Left Side Filters Pane */}
                <div className="filtersPane">
                    <h3>Filters</h3>
                    <div>
                        {/* Add filter options here */}
                    </div>
                </div>

                {/* Right Side Search Input and Results */}
                <div className="resultsPane">
                    <div className="logo">
                        <p className="doc-heading" style={{ opacity: 1 }}>DocAnalyser</p>

                        {/* Back Button */}
                        <Button
                            startIcon={<ArrowBack />}
                            variant="outlined"
                            onClick={handleBack}
                            style={{ marginBottom: '10px' }}
                        >
                            Back
                        </Button>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                className="search-input"
                                placeholder="Search in the document..."
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton position="start" onClick={handleSubmit}>
                                            <Search className='icon' />
                                        </IconButton>
                                    ),
                                    endAdornment: (
                                        <IconButton position="end" onClick={handleCancel}>
                                            <Close className='icon' />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </form>
                    </div>

                    <div className="resultsContainer">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            searchQuery ? (
                                <div className="resultItem">
                                    <p className="resultDescription">
                                        {/* Display the converted document content */}
                                        {searchQuery}
                                    </p>
                                </div>
                            ) : (
                                <div>No content to display. Please search for something.</div>
                            )
                        )}
                    </div>
                    <div className="resultsContainer">
                        {loading ? (
                            <div className="loadingContainer">
                                <CircularProgress />
                                <Typography variant="body1" style={{ marginTop: '10px' }}>
                                    Loading results...
                                </Typography>
                            </div>
                        ) : (
                            <div className="resultsList">
                                {results.length > 0 ? (
                                    results.map((result, index) => (
                                        <div key={index} className="resultItem">
                                            <Typography variant="h6" className="resultTitle">
                                                <a href={result.link} target="_blank" rel="noopener noreferrer">
                                                    {result.title}
                                                </a>
                                            </Typography>
                                            <Typography variant="body2" className="resultLink">
                                                {result.link}
                                            </Typography>
                                            <Typography variant="body1" className="resultDescription">
                                                {result.description}
                                            </Typography>
                                        </div>
                                    ))
                                ) : (
                                    <Typography variant="body1" style={{ marginTop: '20px' }}>
                                        No results found. Try searching for something else.
                                    </Typography>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocSearchResults;
