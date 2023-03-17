import React, { useState, useEffect } from 'react';

function MapTypePicker(mapsTypes: string[]) {
    const [mapTypes, setMapTypes] = useState(mapTypes);
    
    const mapTypeItems = (
        <select name="mapTypes">
            {mapTypes.map(mapType =>
                <option key={mapType}>{mapType}</option>)}
        </select>
    )
    return(
        <div>
            <p>
                Map
            </p>
            {mapTypeItems}
        </div>
    )
}

export default MapTypePicker;