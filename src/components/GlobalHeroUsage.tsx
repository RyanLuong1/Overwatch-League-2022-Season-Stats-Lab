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

const createMapOptions = (listOfMaps: Map[], listOfStages: Stage[], listOfMapTypes: MapType[]): string[] => {
    const filterStages = listOfStages.filter((stage) => {
        return stage.checkedState !== false
    })
    const filterMapTypes = listOfMapTypes.filter((mapType) => {
        return mapType.checkedState !== false
    })
    // console.log(filterStages)
    // console.log(filterMapTypes)
    // console.log(listOfMaps)
    let mapsObjects: Map[] = []
    for (const stage of filterStages) {
        let filterMaps: Map[] = listOfMaps.filter((map) => {
            return map.stage === stage.stageName
        })
        mapsObjects.push(...filterMaps)
    }
    // console.log(mapsObjects)
    let result: Map[] = []
    for (const mapType of filterMapTypes) {
        let filterMaps: Map[] = mapsObjects.filter((map) => {
            return map.type === mapType.typeName
        })
        result.push(...filterMaps)
    }
    const allMaps: string[] = result.map((map) => {return map.mapName})
    return allMaps
}


const GlobalHeroUsage = () => {
    const [mapTypes, updateMapTypes] = useState<MapType[]>(listOfMapTypes)
    const [teams, updateTeams] = useState<Team[]>(listOfTeams)
    const [stages, updateStages] = useState<Stage[]>(listOfStages)
    const [maps, updateMaps] = useState<Map[]>([])
    
    useEffect(() => {
        let newMaps: Map[] = []
        const allStages = stages.map(stage => stage.stageName.replace(":", "-").replace(" ", "-").replace(" ", "").toLowerCase())
        const fetchMaps = async () => {
            for await (const stage of allStages) {
                const response = await fetch(`/overwatch-league/2022/${stage}/map-pools`, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Network response was not OK ${stage}`)
                    }
                    return response.json()
                }).catch((error) => {
                    console.error("There has been a problem with your fetch operation: ", error)
                })
                // console.log(response)
                for (const value of response) {
                    let map: Map = {mapName: value["map_name"], type: value["map_type"], stage: value["stage"], checkedState: true}
                    newMaps.push(map)
                }
            }
        }
        fetchMaps()
        updateMaps(newMaps)
        // for (const object of maps) {
        //     console.log(object)
        // }
    }, [])
    console.log(maps)
    const updateTeamsProperties = (teamsList: string[]): void => {
        updateTeams(prevState => prevState.map((team) => ({
            ...team,
            checkedState: teamsList.includes(team.teamName) ? true : false
        })))
    }

    const updateMapTypesProperties = (mapTypesList: string[]): void => {
        updateMapTypes(prevState => prevState.map((mapType) => ({
            ...mapType,
            checkedState: mapTypesList.includes(mapType.typeName) ? true : false
        })))
    }

    const updateStagesProperties = (stagesList: string[]): void => {
        updateStages(prevState => prevState.map((stage) => ({
            ...stage,
            checkedState: stagesList.includes(stage.stageName) ? true : false
        })))
    }

    const updateMapsProperties = (mapsList: string[]): void => {
        updateMaps(prevState => prevState.map((map) => ({
            ...map,
            checkedState: mapsList.includes(map.mapName) ? true : false
        })))
    }

    const mapOptions: string[] = createMapOptions(maps, stages, mapTypes)
    
    return(
        <div>
            <TeamPicker listOfTeamNames={arrayOfTeamNames} parentFunction={updateTeamsProperties}/>
            <MapTypePicker listOfMapTypeNames={arrayOfMapTypesNames} parentFunction={updateMapTypesProperties}/>
            <StagePicker listOfStageNames={arrayOfStageNames} parentFunction={updateStagesProperties}/>
            <MapPicker listOfMaps={maps} mapOptions={mapOptions} parentFunction={updateMapsProperties}/>
        </div>
    )
}

export default GlobalHeroUsage