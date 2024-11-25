import React from 'react';

const SearchBar = ({ url, setUrl, onSearch }) => (
    <div>
        <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL..."
        />
        <button onClick={onSearch}>Search</button>
    </div>
);

export default SearchBar;
