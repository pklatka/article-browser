import React from 'react'
import './AppInformation.css'

export default function AppInformation({ onClick }) {
    return (
        <>
            <div className='app-information'>
                <h1>Search engine</h1>
                <p>
                    English Wikipedia article search engine. Engine uses Singular Value Decomposition (SVD) to remove noise from the initial matrix and multiplies it by IDF (inverse document frequency) to lower the significance of common words in the text. The current model includes articles from the following categories:
                </p>

                <ul>
                    <li>Computing</li>
                    <li>Fields of mathematics</li>
                    <li>Physics</li>
                    <li>Religion</li>
                </ul>
                <p>
                    More about this method: Matrix Analysis and Applied Linear Algebra, Carl D. Mayer, SIAM, 2000. Singular Value Decomposition: Example 5.12.3 and Example 5.12.4
                </p>

                <p>
                    This project was a part of the computational methods course at AGH UST. The project description (in Polish) is available <a href="https://github.com/pklatka/computational-methods-course/tree/main/Lab%2006" target='_blank' rel="noreferrer" >here</a>.
                </p>

                <h3>Usage</h3>
                <p>Search for articles by typing in the search bar. You can also open the settings panel in top right corner to change the search settings.</p>
            </div>
            <div onClick={onClick} className="app-information-wrapper"></div>
        </>
    )
}