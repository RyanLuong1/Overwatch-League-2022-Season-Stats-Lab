import React, { useState, useEffect } from 'react';

function MapPicker(maps: string[], mapsTypes: string[]) {
    const [mapNames, setMapNames] = useState(maps);
    
    // const mapItems = (
    //     <select name="maps">
    //         {mapNames.map(mapName =>
    //             <option key={mapName}>{mapName}</option>)}
    //     </select>
    // )
    fetch("http://127.0.0.1:5000/bucket").then(response => response.text()).then(text => console.log(text))
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