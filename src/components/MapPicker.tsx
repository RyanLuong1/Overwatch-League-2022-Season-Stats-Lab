import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import {Map} from "./Map"
import {Stage} from "./Stage"
import { MapType } from './MapType';


function MapPicker(props: {listOfMaps: Map[], listOfStages: Stage[], listOfMapTypes: MapType[], parentFunction: Function}) {

    const stagesList: string[] = props.listOfStages.filter((stage) => {
        if (stage.checkedState === true) {
            return stage.stageName
        }
    }).map((stage) => {return stage.stageName.replace(":", "-").replace(" ", "-").replace(" ", "").toLowerCase()})
    const mapTypesList: string[] = props.listOfMapTypes.filter((mapType) => {
        if (mapType.checkedState === true) {
            return mapType.typeName
        }
    }).map((mapType) => {return mapType.typeName})
    let uniqueMaps = new Set<string>(props.listOfMaps.filter((map) => {
        if (stagesList.includes(map.stage) && mapTypesList.includes(map.type)) {
            return map.mapName
        }
    }).map((map) => {return map.mapName}))

    const [mapNames, updateMapsNames] = useState<string[]>([...uniqueMaps]);
    
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
            freeSolo
            multiple
            forcePopupIcon={true}
            id="checkboxes-tags-demo"
            options={[...uniqueMaps]}
            disableCloseOnSelect
            getOptionLabel={(mapName) => mapName}
            onChange={(event, newArray) => handleChange(newArray)}
            style={{ width: 500 }}
            value={[...mapNames]}
            inputValue=''
            renderInput={(params) => (
                <TextField {...params} label={mapNames.length === mapNames.length ? "All" : mapNames.length === 0 ? "" : "Multiple Values"}/>
            )}
            renderTags={(mapNames) => {
                return mapNames.length === mapNames.length ? "All" : "Multiple Values"
            }}
            />
            </div>
        </div>
    )
}

export default MapPicker;