import React from 'react'
import { useState } from 'react'
import './Root.css'
import { FcSearch } from 'react-icons/fc'
import { GoSearch } from 'react-icons/go'
import { PuffLoader } from "react-spinners";
import AsidePanel from '../components/AsidePanel.tsx'
import SearchEntry from '../components/SearchEntry.tsx'

interface SearchEntryObject {
    title: string,
    link: string,
    probability: number,
    summary: string
}

export default function Root() {
    const [useIDF, setUseIDF] = useState(true)
    const [removeNoise, setRemoveNoise] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [showLoader, setShowLoader] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [recordLimit, setRecordLimit] = useState(10)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            console.log("Search in progress...")
            console.log("Use IDF: " + useIDF)
            console.log("Remove noise: " + removeNoise)
            console.log("Record limit: " + recordLimit)
            setShowLoader(true)
            setSearchResults([])

            const result = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: searchText,
                    idf: useIDF,
                    svd: removeNoise,
                    k: recordLimit
                })
            })

            const data = await result.json()
            if (data.error) throw new Error(data.error)

            setSearchResults(data.result)
        } catch (err) {
            console.error(err)
        } finally {
            setShowLoader(false)
        }
    }


    return (
        <main>
            <header>
                <AsidePanel idfState={[useIDF, setUseIDF]} removeNoiseState={[removeNoise, setRemoveNoise]} recordLimitState={[recordLimit, setRecordLimit]} />
                <div className='header'>
                    <FcSearch className='header-icon' />
                    <h1>Search engine</h1>
                </div>
                <form className='inputwrapper' onSubmit={handleSubmit}>
                    <input className='textinput' placeholder='Type here to search' type="text" name="search_text" autoComplete='off' id="search_text" onInput={(e) => setSearchText(e.target.value)} />
                    <button type='submit' className='inputbutton'>
                        <GoSearch />
                    </button>
                </form>
            </header>

            {showLoader && <section className='loader'> <PuffLoader size={150} color="#64b5f6" /> </section>}

            <section className='results'>
                {searchResults.map((res: SearchEntryObject, index) => <SearchEntry key={index} title={res?.title} url={res?.link} probability={res?.probability} summary={res?.summary} />)}
            </section>

            <footer><a href='https://klatka.it/' target='_blank' rel="noreferrer">@pklatka</a></footer>
        </main>
    )
}