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

console.log("First")




// const getAllMaps = (listOfStages: Stage[]) => {
//     let allMaps: Map[] = []
//     const allStages = listOfStages.map(stage => stage.stageName.replace(":", "-").replace(" ", "-").replace(" ", "").toLowerCase())
//     for (const stage of allStages) {
//             const response = fetch(`/overwatch-league/2022/${stage}/map-pools`, {
//                 method: "GET",
//                 mode: "cors",
//                 cache: "no-cache",
//                 credentials: "same-origin",
//             }).then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not OK ${stage}`)
//                 }
//                 return response.json()
//             }).then((data) => {
//                 for (const value of data) {
//                     let map: Map = {mapName: value["map_name"], type: value["map_type"], stage: value["stage"], checkedState: true}
//                     allMaps.push(map)
//                 }
//             })
//     }
//     return allMaps
// }


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

// const listOfMaps: Map[] = getAllMaps(listOfStages)
// console.log(listOfMaps)

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


// const createMapOptions = (listOfMaps: Map[], listOfStages: Stage[], listOfMapTypes: MapType[]): string[] => {
//     const filterStages = listOfStages.filter((stage) => {
//         return stage.checkedState !== false
//     })
//     const filterMapTypes = listOfMapTypes.filter((mapType) => {
//         return mapType.checkedState !== false
//     })
//     // console.log(filterStages)
//     // console.log(filterMapTypes)
//     // console.log(listOfMaps)
//     let mapsObjects: Map[] = []
//     for (const stage of filterStages) {
//         let filterMaps: Map[] = listOfMaps.filter((map) => {
//             return map.mapName === stage.stageName.replace(":", "-").replace(" ", "-").replace(" ", "").toLowerCase()
//         }).map((map) => {return map})
//         mapsObjects.push(...filterMaps)
//     }
//     let result: Map[] = []
//     for (const mapType of filterMapTypes) {
//         let filterMaps: Map[] = mapsObjects.filter((map) => {
//             return map.type === mapType.typeName
//         })
//         result.push(...filterMaps)
//     }
//     const allMaps: string[] = result.map((map) => {return map.mapName})
//     return allMaps
// }


const GlobalHeroUsage = () => {
    const [mapTypes, updateMapTypes] = useState<MapType[]>(listOfMapTypes)
    const [teams, updateTeams] = useState<Team[]>(listOfTeams)
    const [stages, updateStages] = useState<Stage[]>(listOfStages)
    const [maps, updateMaps] = useState<Map[]>([])
    const [mapOptions, setMapOptions] = useState<string[]>([])
    console.log(teams)
    console.log(stages)
    console.log(mapTypes)
    console.log(maps)
    useEffect(() => {
        // let allMaps: Map[] = []
        // const allStages = stages.map(stage => stage.stageName.replace(":", "-").replace(" ", "-").replace(" ", "").toLowerCase())
        // for (const stage of allStages) {
        //         const response = fetch(`/overwatch-league/2022/${stage}/map-pools`, {
        //             method: "GET",
        //             mode: "cors",
        //             cache: "no-cache",
        //             credentials: "same-origin",
        //         }).then((response) => {
        //             if (!response.ok) {
        //                 throw new Error(`Network response was not OK ${stage}`)
        //             }
        //             return response.json()
        //         }).then((data) => {
        //             for (const value of data) {
        //                 let map: Map = {mapName: value["map_name"], type: value["map_type"], stage: value["stage"], checkedState: true}
        //                 allMaps.push(map)
        //             }
        //         })
        // }
        const allStages = stages.map(stage => stage.stageName.replace(":", "-").replace(" ", "-").replace(" ", "").toLowerCase())
        let allMaps: Map[] = []
        let fetchMaps = async () => {
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
                for (const value of response) {
                    let map: Map = {mapName: value["map_name"], type: value["map_type"], stage: value["stage"], checkedState: true}
                    allMaps.push(map)
                }
            }
        }
        fetchMaps()
        updateMaps(allMaps)
        // console.log(maps)
    }, [])
    const updateTeamsProperties = (teamsList: string[]): void => {
        // console.log(teamsList)
        // for (let team of teams) {
        //     console
        // }
        updateTeams(prevState => prevState.map((team) => {
            if (!teamsList.includes(team.teamName)) {
                return {...team, checkedState: false}
            }
            return {...team, checkedState: true}
        }))
        console.log(teams)
    }

    const updateMapTypesProperties = (mapTypesList: string[]): void => {
        updateMapTypes(prevState => prevState.map((mapType) => {
            if (!mapTypesList.includes(mapType.typeName)) {
                return {...mapType, checkedState: false}
            }
            return {...mapType, checkedState: true}
        }))
        console.log(mapTypes)
    }

    const updateStagesProperties = (stagesList: string[]): void => {
        updateStages(prevState => prevState.map((stage) => {
            if (!stagesList.includes(stage.stageName)) {
                return {...stage, checkedState: false}
            }
            return {...stage, checkedState: true}
        }))
        console.log(stages)
    }

    const updateMapsProperties = (mapsList: string[]): void => {
        const stagesList: string[] = stages.filter((stage) => {
            if (stage.checkedState === true) {
                return stage.stageName
            }
        }).map((stage) => {return stage.stageName})
        const mapTypesList: string[] = mapTypes.filter((mapType) => {
            if (mapType.checkedState === true) {
                return mapType.typeName
            }
        }).map((mapType) => {return mapType.typeName})
        // updateMaps(prevState => prevState.map((map) => {
        //     if (!mapsList.includes(map.mapName) || ) {
                
        //     }
        // }
    }
    return(
        <div>
            <TeamPicker listOfTeamNames={arrayOfTeamNames} parentFunction={updateTeamsProperties}/>
            <MapTypePicker listOfMapTypeNames={arrayOfMapTypesNames} parentFunction={updateMapTypesProperties}/>
            <StagePicker listOfStageNames={arrayOfStageNames} parentFunction={updateStagesProperties}/>
            <MapPicker listOfMaps={maps} parentFunction={updateMapsProperties}/>
        </div>
    )
}


export default GlobalHeroUsage