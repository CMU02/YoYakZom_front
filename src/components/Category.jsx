import React from 'react';

export default function Category({ category, count }) {
    return (
        <div className="nav-item">
            {category}
            <span className="count">({count})</span>
        </div>
    )
}
