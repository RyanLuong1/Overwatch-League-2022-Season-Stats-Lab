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

    const updateMapTypePicksHelper = (name, clicked) => {
        console.log(name, clicked)
        if (clicked !== true) {
            updateMapTypePicks(mapTypePicks.filter(mapTypeName => mapTypeName !== name))
        }
        else {
            updateMapTypePicks([...mapTypePicks, name])
            }
        }

    // useEffect(() => {
    //     updateMapTypePicksHelper(props.listOfMapType)
    // }, [])
    // const [mapTypeSet, updateMapTypeSet] = useState<Array<string>>(mapCategories);
    // const [isChecked, updateIsChecked] = useState<Array<boolean>>(isCheckedArray)
    // console.log(mapTypeSet)

    // const updateMapTypeSetHelper = ({mapType} : {mapType: string}) => {
    //     if (mapTypeSet.includes(mapType)) {
    //         updateMapTypeSet(mapTypeSet.filter(type => type !== mapType))
    //     }
    //     else {
    //         updateMapTypeSet([...mapTypeSet, mapType])
    //     }
    // }

    // const updateIsCheckedHelper = ({index, checkedState}: {index: number, checkedState: boolean}) => {
    //     updateIsChecked((isChecked) => {
    //         return isChecked.map((c, i) => {
    //             if (i === index) {
    //                 return checkedState
    //             }
    //             return c
    //         } )
    //     })
    // }

    // const updateBothMapTypeSetAndIsChecked = ({mapType, index, checkedState}: {mapType: string, index: number, checkedState: boolean}) => {
    //     updateMapTypeSetHelper(mapType)
    //     updateIsCheckedHelper(index, checkedState)
        // updateMapTypeSetHelper(mapType)
        // updateIsCheckedHelper(index, checkedState)

    // }

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
    const handleChange = (event, mapTypeName, clicked) => {
        updateMapTypePicksHelper(mapTypeName, clicked)
        props.parentFunction(mapTypeName, clicked)
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
            options={props.listOfMapType}
            disableCloseOnSelect
            getOptionLabel={(mapType) => mapType.value}
            renderOption={(props, mapType, { selected }) => (
                <li {...props}>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={mapType.checkedState}
                    onChange={(event, clicked) => handleChange(event, mapType.value, clicked)}
                />
                {mapType.value}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label={props.listOfMapType.length === 5 ? "All" : "Multiple Values"}/>
            )}
            />
            </div>
        </div>
    )
}

export default MapTypePicker;