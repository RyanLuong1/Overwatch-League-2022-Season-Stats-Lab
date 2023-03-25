import React, {useState, useEffect} from 'react'
import MapTypePicker from "./MapTypePicker.tsx"
import { MapType } from './MapType';

const listOfMapType: MapType[] = [
    {value: "assult", label: "Assult", index: 0, checkedState: true},
    {value: "control", label: "Control", index: 1, checkedState: true},
    {value: "hybrid", label: "Hybrid", index: 2, checkedState: true},
    {value: "payload", label: "Payload", index: 3, checkedState: true},
    {value: "push", label: "Push", index: 4, checkedState: true},
  ]

const GlobalHeroUsage = () => {
    const [arrayOfMapType, updateArrayOfMapType] = useState<MapType[]>(listOfMapType)
    const updateArrayOfMapTypeHelper = (newArray: string[]): void => {
        updateArrayOfMapType(prevState => prevState.map(mapType => ({
            ...mapType,
            checkedState: newArray.includes(mapType.value) ? true : false
        })))
    }
    return(
        <div>
            <MapTypePicker listOfMapType={arrayOfMapType} parentFunction={updateArrayOfMapTypeHelper}/>
        </div>
    )
}

export default GlobalHeroUsage