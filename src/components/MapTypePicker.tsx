import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { TextField, Autocomplete, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export interface MapType {
    value: string;
    label: string;
}

const mapTypes: readonly MapType[] = [
    {value: "assult", label: "Assult"},
    {value: "control", label: "Control"},
    {value: "hybrid", label: "Hybrid"},
    {value: "payload", label: "Payload"},
    {value: "push", label: "Push"},
]

const MapTypePicker = ({mapCategories}: {mapCategories: Array<string>}) => {
    const [mapTypeSet, updateMapTypeSet] = useState<Array<string>>(mapCategories);
    console.log(mapTypeSet)
    function update(type: string) {
        if (mapTypeSet.includes(type)) {
            updateMapTypeSet(mapTypeSet.filter(category => category !== type))
        }
        else {
            updateMapTypeSet([...mapTypeSet, type])
        }
    }
    
    // const mapItems = (
    //     <select name="maps">
    //         {mapNames.map(mapName =>
    //             <option key={mapName}>{mapName}</option>)}
    //     </select>
    // )
    // fetch("http://127.0.0.1:5000/bucket").then(response => response.text()).then(text => console.log(text))
    return(
        <div>
            <p>
                Map
            </p>
            <div>
            <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={mapTypes}
            disableCloseOnSelect
            getOptionLabel={(option) => option.value}
            onChange={(event, value) => update(value[0].value)}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    defaultChecked={true}
                />
                {option.value}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label="All"/>
            )}
            />
            </div>
        </div>
    )
}

export default MapTypePicker;