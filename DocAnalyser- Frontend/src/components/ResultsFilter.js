import React, { useState } from 'react';

const ResultsFilter = ({ results }) => {
    const [filter, setFilter] = useState('');

    const filteredResults = results.filter(item =>
        item.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter keywords..."
            />
            <ul>
                {filteredResults.map((item, index) => (
                    <li key={index}>
                        <a href={item.link}>{item.title}</a>
                        <p>{item.snippet}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultsFilter;
