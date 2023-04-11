import React from "react"
import { useState } from "react"
import { GoSettings } from 'react-icons/go'
import { GrCircleQuestion } from 'react-icons/gr'
import SettingsPanel from './SettingsPanel.tsx'
import AppInformation from "./AppInformation.tsx"
import './AsidePanel.css'

export default function AsidePanel({ idfState, removeNoiseState, recordLimitState }) {
    const [settingsPanel, setSettingsPanel] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    return (
        <>
            <div className="aside-panel">
                <GrCircleQuestion onClick={() => { setShowInfo(!showInfo) }} className="icon" />
                <GoSettings onClick={() => { setSettingsPanel(!settingsPanel) }} className="icon" />
            </div>
            {settingsPanel && <SettingsPanel isVisible={setSettingsPanel} idfState={idfState} removeNoiseState={removeNoiseState} recordLimitState={recordLimitState} />}
            {showInfo && <AppInformation onClick={() => { setShowInfo(false) }} />}
        </>
    )
}