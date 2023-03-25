import React, {useState, useEffect} from 'react'
import MapTypePicker from "./MapTypePicker.tsx"
import { MapType } from './MapType';
import { Team } from './Team'

const listOfMapType: MapType[] = [
    {typeName: "assult", checkedState: true},
    {typeName: "control", checkedState: true},
    {typeName: "hybrid", checkedState: true},
    {typeName: "payload", checkedState: true},
    {typeName: "push", checkedState: true},
  ]

const listOfTeam: Team[] = [
    {teamName: "Atlanta Reign", checkedState: true},
]

const GlobalHeroUsage = () => {
    const [arrayOfMapType, updateArrayOfMapType] = useState<MapType[]>(listOfMapType)
    const updateArrayOfMapTypeHelper = (newArray: string[]): void => {
        updateArrayOfMapType(prevState => prevState.map(mapType => ({
            ...mapType,
            checkedState: newArray.includes(mapType.typeName) ? true : false
        })))
        console.log(arrayOfMapType)
    }
    return(
        <div>
            <MapTypePicker parentFunction={updateArrayOfMapTypeHelper}/>
        </div>
    )
}

export default GlobalHeroUsage