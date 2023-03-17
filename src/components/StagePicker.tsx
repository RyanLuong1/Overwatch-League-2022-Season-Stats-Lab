import React, { useState, useEffect } from 'react';

function StagePicker() {
    const [stageName, setStageName] = useState("All");
    
    return(
        <div>
            <p>
                Stage
            </p>
            <select name="stages">
                <option value="Kickoff Clash: Qualifiers"> Kickoff Clash: Qualifiers </option>
                <option value="Kickoff Clash: Tournament"> Kickoff Clash: Tournament </option>
                <option value="Midseason Madness: Qualifiers"> Midseason Madness: Qualifiers </option>
                <option value="Midseason Madness: Tournament"> Midseason Madness: Tournament </option>
                <option value="Summer Showdown: Qualifiers"> Summer Showdown: Qualifiers </option>
                <option value="Summer Showdown: Tournament"> Summer Showdown: Tournament </option>
                <option value="Countdown Cup: Qualifiers"> Countdown Cup: Qualifiers </option>
                <option value="Grand Finals"> Grand Finals </option>
            </select>
        </div>
    )
}

export default StagePicker;