import React, {useState, useEffect} from 'react'
import MapTypePicker from "./MapTypePicker.tsx"
import { MapType } from './MapType';
import { Team } from './Team'
import TeamPicker from './TeamPicker.tsx';

const listOfMapTypes: MapType[] = [
    {typeName: "assult", checkedState: true},
    {typeName: "control", checkedState: true},
    {typeName: "hybrid", checkedState: true},
    {typeName: "payload", checkedState: true},
    {typeName: "push", checkedState: true},
  ]

const listOfTeams: Team[] = [
    {teamName: "Atlanta Reign", checkedState: true},
    {teamName: "Boston Uprising", checkedState: true},
    {teamName: "Chengdu Hunter", checkedState: true},
    {teamName: "Dallas Fuel", checkedState: true},
    {teamName: "Florida Mayhem", checkedState: true},
    {teamName: "Guangzhou Charge", checkedState: true},
    {teamName: "Hangzhou Spark", checkedState: true},
    {teamName: "Houston Outlaws", checkedState: true},
    {teamName: "London Spitfire", checkedState: true},
    {teamName: "Los Angeles Gladiators", checkedState: true},
    {teamName: "Los Angeles Valiant", checkedState: true},
    {teamName: "New York Excelsior", checkedState: true},
    {teamName: "San Francisco Shock", checkedState: true},
    {teamName: "Seoul Dynasty", checkedState: true},
    {teamName: "Seoul Infernal", checkedState: true},
    {teamName: "Shanghai Dragons", checkedState: true},
    {teamName: "Toronto Defiant", checkedState: true},
    {teamName: "Vancouver Titans", checkedState: true},
    {teamName: "Vegas Eternal", checkedState: true},
    {teamName: "Washington Justice", checkedState: true},
]

const arrayOfTeamName: string[] = listOfTeams.map((team) =>
    team.teamName
)

const GlobalHeroUsage = () => {
    const [arrayOfMapType, updateArrayOfMapType] = useState<MapType[]>(listOfMapTypes)
    const [arrayOfTeams, updateArrayOfTeams] = useState<Team[]>(listOfTeams)
    
    const updateArrayOfMapTypeHelper = (newArray: string[]): void => {
        updateArrayOfMapType(prevState => prevState.map((mapType) => ({
            ...mapType,
            checkedState: newArray.includes(mapType.typeName) ? true : false
        })))
    }

    const updateArrayOfTeamsHelper = (newArray: string[]): void => {
        updateArrayOfTeams(prevState => prevState.map((team) => ({
            ...team,
            checkedState: newArray.includes(team.teamName) ? true : false
        })))
    }

    console.log(arrayOfTeamName)
    return(
        <div>
            <TeamPicker listOfTeams={arrayOfTeamName} parentFunction={updateArrayOfTeamsHelper}/>
            <MapTypePicker parentFunction={updateArrayOfMapTypeHelper}/>
        </div>
    )
}

export default GlobalHeroUsage