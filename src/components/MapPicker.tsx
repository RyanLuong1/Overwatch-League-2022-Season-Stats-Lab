import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import {Map} from "./Map"
import {Stage} from "./Stage"
import { MapType } from './MapType';


function MapPicker(props: {listOfMaps: Map[], parentFunction: Function}) {
    // let maps: string[] = props.listOfMaps.map((map) => {return map.mapName})

    const [mapNames, updateMapsNames] = useState<string[]>([]);
    
    const updateMapsNamesHelper = (newArray) => {
        updateMapsNames([...newArray])
    }

    const handleChange = (newArray) => {
        // updateMapsNamesHelper(newArray)
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
            getOptionLabel={(mapName) => mapName.mapName}
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