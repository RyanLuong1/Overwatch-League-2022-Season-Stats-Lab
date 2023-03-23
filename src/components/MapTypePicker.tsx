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
    index: number
}

const mapTypes: readonly MapType[] = [
    {value: "assult", label: "Assult", index: 0},
    {value: "control", label: "Control", index: 1},
    {value: "hybrid", label: "Hybrid", index: 2},
    {value: "payload", label: "Payload", index: 3},
    {value: "push", label: "Push", index: 4},
]

const MapTypePicker = ({mapCategories, isCheckedArray}: {mapCategories: Array<string>, isCheckedArray: Array<boolean>}) => {
    const [mapTypeSet, updateMapTypeSet] = useState<Array<string>>(mapCategories);
    const [isChecked, updateIsChecked] = useState<Array<boolean>>(isCheckedArray)
    console.log(mapTypeSet)

    const updateMapTypeSetHelper = ({mapType} : {mapType: string}) => {
        if (mapTypeSet.includes(mapType)) {
            updateMapTypeSet(mapTypeSet.filter(type => type !== mapType))
        }
        else {
            updateMapTypeSet([...mapTypeSet, mapType])
        }
    }

    const updateIsCheckedHelper = ({index, checkedState}: {index: number, checkedState: boolean}) => {
        updateIsChecked((isChecked) => {
            return isChecked.map((c, i) => {
                if (i === index) {
                    return checkedState
                }
                return c
            } )
        })
    }

    const updateBothMapTypeSetAndIsChecked = ({mapType, index, checkedState}: {mapType: string, index: number, checkedState: boolean}) => {
        console.log(mapType)
        // updateMapTypeSetHelper(mapType)
        // updateIsCheckedHelper(index, checkedState)

    }

    // const update = ({mapType, index, checkedState}: {mapType: string, index: number, checkedState: boolean}) => {
    //     console.log(mapTypeSet)
    //     updateMapTypeSetHelper(mapType)
    //     updateIsCheckedHelper(index, checkedState)
    //     console.log(mapTypeSet)
    
    
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
            getOptionLabel={(mapType) => mapType.value}
            renderOption={(props, mapType, { selected }) => (
                <li {...props} key={mapType.index}>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    defaultChecked={true}
                    id={(mapType.index).toString()}
                    onChange={(event, isChecked) => updateBothMapTypeSetAndIsChecked(mapType.value, mapType.index, isChecked)}
                />
                {mapType.value}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label={mapTypeSet.length === 5 ? "All" : "Multiple Values"}/>
            )}
            />
            </div>
        </div>
    )
}

export default MapTypePicker;