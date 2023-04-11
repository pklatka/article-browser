import React from 'react'
import './SearchEntry.css'

export default function SearchEntry({ title, url, probability, summary }) {
    return (
        <div className="search-entry">
            <h3><a href={url} target='_blank' rel="noreferrer" > {title}</a></h3>
            <h5 style={{ fontWeight: '500' }}>Probability: {probability} | {url}</h5>
            <p>{summary}</p>
        </div>
    )
}