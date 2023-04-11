import React from 'react'
import './SettingsPanel.css'

export default function SettingsPanel({ isVisible, idfState, removeNoiseState, recordLimitState }) {
    const [useIDF, setIDF] = idfState
    const [removeNoise, setRemoveNoise] = removeNoiseState
    const [recordLimit, setRecordLimit] = recordLimitState

    return (
        <>
            <div onClick={() => isVisible(false)} className='settings-panel-wrapper'></div>
            <div className="settings-panel">
                <h1>Settings</h1>
                <div className='input-holder'>
                    <input type="checkbox" defaultChecked={useIDF} onChange={(e) => setIDF(e.target.checked)} name="idf" id="idf" />
                    <label htmlFor="idf">Use Inverse Document Frequency</label>
                </div>

                <div className='input-holder'>
                    <input type="checkbox" defaultChecked={removeNoise} onChange={(e) => setRemoveNoise(e.target.checked)} name="svd" id="svd" />
                    <label htmlFor="svd">Remove noise using Low Rank Approximation</label>
                </div>

                <div className='input-holder'>
                    <label htmlFor="record-limit">Record limit:</label>
                    <input value={recordLimit} type="number" onChange={(e) => {
                        if (Number(e.target.value) > 9999) e.target.value = "9999"
                        else if (Number(e.target.value) < 1) e.target.value = "1"
                        setRecordLimit(e.target.value)
                    }} style={{ width: 45, marginLeft: 10 }} min={1} max={9999} name="record-limit" id="record-limit" />
                </div>
            </div>
        </>
    )
}