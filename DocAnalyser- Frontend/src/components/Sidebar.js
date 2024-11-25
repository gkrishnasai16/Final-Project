import React, { useState } from 'react';
import { Box, Typography, Divider, Button, Checkbox, FormControlLabel } from '@mui/material';

const Sidebar = ({ keywords, sourceTopics, onKeywordsChange }) => {
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [selectedSourceTopics, setSelectedSourceTopics] = useState([]);

    const handleKeywordChange = (keyword) => {
        const updatedKeywords = selectedKeywords.includes(keyword)
            ? selectedKeywords.filter(k => k !== keyword)
            : [...selectedKeywords, keyword];
        
        setSelectedKeywords(updatedKeywords);
        onKeywordsChange(updatedKeywords);
    };

    return (
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="contained" sx={{ mb: 2, textTransform: 'none' }}>🔄 Analyse</Button>
            <Divider />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Keywords</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {keywords.map((keyword) => (
                    <FormControlLabel
                        key={keyword}
                        control={
                            <Checkbox
                                checked={selectedKeywords.includes(keyword)}
                                onChange={() => handleKeywordChange(keyword)}
                                sx={{ padding: 0, marginRight: 1 }}
                            />
                        }
                        label={keyword}
                    />
                ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Source Topics</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {sourceTopics.map((topic) => (
                    <FormControlLabel
                        key={topic}
                        control={
                            <Checkbox
                                checked={selectedSourceTopics.includes(topic)}
                                onChange={() => handleKeywordChange(topic)}
                                sx={{ padding: 0, marginRight: 1 }}
                            />
                        }
                        label={topic}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Sidebar;
