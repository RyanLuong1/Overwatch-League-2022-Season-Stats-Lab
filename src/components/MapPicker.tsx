import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import {Map} from "./Map"
import {Stage} from "./Stage"
import { MapType } from './MapType';

function MapPicker(props: {listOfMaps: Map[], listOfStages: Stage[], listOfMapTypes: MapType[], parentFunction: Function}) {
    let maps: string[] = props.listOfMaps.map((map) => {return map.mapName})

    const createMapOptions = (listOfMaps: Map[], listOfStages: Stage[], listOfMapTypes: MapType[]) => {
        const filterStages = listOfStages.filter((stage) => {
            return stage.checkedState !== false
        })
        const filterMapTypes = listOfMapTypes.filter((mapType) => {
            return mapType.checkedState !== false
        })
        let mapsObjects: Map[] = []
        for (const stage of filterStages) {
            let filterMaps: Map[] = listOfMaps.filter((map) => {
                return map.stage === stage.stageName
            })
            mapsObjects.push(...filterMaps)
        }
        for (const mapTypes of filterMapTypes) {
        }
    }


    const [mapNames, updateMapsNames] = useState<string[]>(maps);
    
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
            options={maps}
            disableCloseOnSelect
            getOptionLabel={(mapName) => mapName}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newArray) => handleChange(newArray)}
            value={maps}
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