import React, { useState, useEffect } from 'react';

function MapPicker(maps: string[], mapsTypes: string[]) {
    const [mapNames, setMapNames] = useState(maps);
    
    const mapItems = (
        <select name="maps">
            {mapNames.map(mapName =>
                <option key={mapName}>{mapName}</option>)}
        </select>
    )
    return(
        <div>
            <p>
                Map
            </p>
            {mapItems}
        </div>
    )
}

export default MapPicker;