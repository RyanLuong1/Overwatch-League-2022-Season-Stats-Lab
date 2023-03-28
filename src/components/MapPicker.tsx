import React, { useState, useEffect } from 'react';

function MapPicker() {
    const [mapNames, setMapNames] = useState();
    
    // const mapItems = (
    //     <select name="maps">
    //         {mapNames.map(mapName =>
    //             <option key={mapName}>{mapName}</option>)}
    //     </select>
    // )
    fetch("/overwatch-league/2022/grand-finals/map-pools", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
    }
    ).then(response => response.json()).then(json => console.log(json))
    return(
        <div>
            <p>
                Map
            </p>
            {/* {mapItems} */}
            Hi
        </div>
    )
}

export default MapPicker;