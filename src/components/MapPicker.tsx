import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

function MapPicker(props: {listOfMaps: string[], parentFunction: Function}) {
    const [mapNames, updateMapsNames] = useState<string[]>(props.listOfMaps);
    
    const updateMapsNamesHelper = (newArray) => {
        updateMapsNames([...newArray])
    }

    const handleChange = (newArray) => {
        updateMapsNamesHelper(newArray)
        props.parentFunction(newArray)
    }

    return(
        <div>
            <p>
                Map
            </p>
            <div>
            <Autocomplete
            multiple
            limitTags={2}
            id="checkboxes-tags-demo"
            options={props.listOfMaps}
            disableCloseOnSelect
            getOptionLabel={(mapName) => mapName}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newArray) => handleChange(newArray)}
            value={props.listOfMaps}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label={mapNames.length === props.listOfMaps.length ? "All" : mapNames.length === 0 ? "" : "Multiple Values"}/>
            )}
            renderTags={(mapNames) => {
                return mapNames.length === props.listOfMaps.length ? "All" : "Multiple Values"
            }}
            />
            </div>
        </div>
    )
}

export default MapPicker;