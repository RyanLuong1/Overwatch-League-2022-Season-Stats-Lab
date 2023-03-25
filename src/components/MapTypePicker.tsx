import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { TextField, Autocomplete, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { MapType } from './MapType';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MapTypePicker = (props: {listOfMapType: MapType[], parentFunction: Function}) => {
    const [mapTypePicks, updateMapTypePicks] = useState<string[]>(["assult", "control", "hybrid", "payload", "push"])

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
            options={["assult", "control", "hybrid", "payload", "push"]}
            disableCloseOnSelect
            getOptionLabel={(mapType) => mapType}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newArray) => handleChange(newArray)}
            defaultValue={["assult", "control", "hybrid", "payload", "push"]}
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