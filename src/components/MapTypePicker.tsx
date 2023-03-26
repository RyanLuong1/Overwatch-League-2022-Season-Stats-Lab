import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { TextField, Autocomplete, Checkbox } from '@mui/material';

const MapTypePicker = (props: {listOfMapTypeNames: string[], parentFunction: Function}) => {
    const [mapTypePicks, updateMapTypePicks] = useState<string[]>(props.listOfMapTypeNames)

    const updateMapTypePicksHelper = (newArray) => {
        updateMapTypePicks([...newArray])
        }

    // fetch("http://127.0.0.1:5000/bucket").then(response => response.text()).then(text => console.log(text))
    const handleChange = (newArray) => {
        updateMapTypePicksHelper(newArray)
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
            id="checkboxes-tags-demo"
            options={props.listOfMapTypeNames}
            disableCloseOnSelect
            getOptionLabel={(mapType) => mapType}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newArray) => handleChange(newArray)}
            defaultValue={props.listOfMapTypeNames}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label={mapTypePicks.length === 5 ? "All" : "Multiple Values"}/>
            )}
            />
            </div>
        </div>
    )
}

export default MapTypePicker;