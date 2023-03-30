import React, {useState, useEffect} from 'react'
import MapTypePicker from "./MapTypePicker.tsx"
import { MapType } from './MapType';
import { Team } from './Team'
import {Stage} from './Stage'
import {Map} from "./Map"
import TeamPicker from './TeamPicker.tsx';
import StagePicker from './StagePicker.tsx';
import MapPicker from './MapPicker.tsx';
import { AllInbox } from '@mui/icons-material';

const listOfMapTypes: MapType[] = [
    {typeName: "assult", checkedState: true},
    {typeName: "control", checkedState: true},
    {typeName: "hybrid", checkedState: true},
    {typeName: "payload", checkedState: true},
    {typeName: "push", checkedState: true},
  ]

const listOfStages: Stage[] = [
    {stageName: "Kickoff Clash: Qualifiers", checkedState: true},
    {stageName: "Kickoff Clash: Tournament", checkedState: true},
    {stageName: "Midseason Madness: Qualifiers", checkedState: true},
    {stageName: "Midseason Madness: Tournament", checkedState: true},
    {stageName: "Summer Showdown: Qualifiers", checkedState: true},
    {stageName: "Summer Showdown: Tournament", checkedState: true},
    {stageName: "Countdown Cup: Qualifiers", checkedState: true},
    {stageName: "Grand Finals", checkedState: true}
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

const arrayOfMapTypesNames: string[] = listOfMapTypes.map((mapType) =>
    mapType.typeName
)


const arrayOfTeamNames: string[] = listOfTeams.map((team) =>
    team.teamName
)

const arrayOfStageNames: string[] = listOfStages.map((stage) => 
    stage.stageName
)



const GlobalHeroUsage = () => {
    const [arrayOfMapTypes, updateArrayOfMapTypes] = useState<MapType[]>(listOfMapTypes)
    const [arrayOfTeams, updateArrayOfTeams] = useState<Team[]>(listOfTeams)
    const [arrayofStages, updateArrayOfStages] = useState<Stage[]>(listOfStages)
    const [arrayOfMaps, updateArrayOfMaps] = useState<Map[]>([])
    
    useEffect(() => {
        const stages = arrayofStages.map(stage => stage.stageName.replace(":", "-").replace(" ", "-").replace(" ", "").toLowerCase())
        const fetchMaps = async () => {
            for await (const stage of stages) {
                const response = await fetch(`/overwatch-league/2022/${stage}/map-pools`, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not OK")
                    }
                    return response.json()
                }).catch((error) => {
                    console.error("There has been a problem with your fetch operation: ", error)
                })
                for (let value of response) {
                    let map: Map = {mapName: value["map_name"], type: value["map_type"], stage: value["stage"], checkedState: true}
                    updateArrayOfMaps([...arrayOfMaps, map])
                }
            }
        }
        fetchMaps()
    }, [])
    // console.log(arrayOfMaps.length)
    // for (let value of arrayOfMaps) {
    //     console.log(value)
    // }

    const updateArrayOfMapsHelper = (mapTypeArray: string[] = [], stageArray: string[] = []): void => {
        updateArrayOfMaps(prevState => prevState.map((map) => ({
            ...map,
            checkedState: mapTypeArray.includes(map.type) ? true : false
        })))

        updateArrayOfMaps(prevState => prevState.map((map) => ({
            ...map,
            checkedState: stageArray.includes(map.stage) ? true : false
        })))
    }

    const updateArrayOfMapTypesHelper = (newArray: string[]): void => {
        updateArrayOfMapTypes(prevState => prevState.map((mapType) => ({
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

    const updateArrayOfStagesHelper = (newArray: string[]): void => {
        updateArrayOfStages(prevState => prevState.map((stage) => ({
            ...stage,
            checkedState: newArray.includes(stage.stageName) ? true : false
        })))
    }
    return(
        <div>
            <TeamPicker listOfTeamNames={arrayOfTeamNames} parentFunction={updateArrayOfTeamsHelper}/>
            <MapTypePicker listOfMapTypeNames={arrayOfMapTypesNames} parentFunction={updateArrayOfMapTypesHelper}/>
            <StagePicker listOfStageNames={arrayOfStageNames} parentFunction={updateArrayOfStagesHelper}/>
            <MapPicker/>
        </div>
    )
}

export default GlobalHeroUsage