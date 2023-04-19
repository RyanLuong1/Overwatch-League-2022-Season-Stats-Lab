import React, {useState, useEffect} from 'react'
import MapTypePicker from "./MapTypePicker.tsx"
import { MapType } from './MapType';
import { Team } from './Team'
import {Stage} from './Stage'
import {Map} from "./Map"
import TeamPicker from './TeamPicker.tsx';
import StagePicker from './StagePicker.tsx';
import MapPicker from './MapPicker.tsx';
import { PickRate } from './PickRate.js';
import LeagueUsage from './LeagueUsage.tsx';

console.log("First")


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
    const [mapTypes, updateMapTypes] = useState<MapType[]>(listOfMapTypes)
    const [teams, updateTeams] = useState<Team[]>(listOfTeams)
    const [stages, updateStages] = useState<Stage[]>(listOfStages)
    const [maps, updateMaps] = useState<Map[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [opponentPickRates, updateOpponentPickRates] = useState<PickRate[]>([])
    console.log(opponentPickRates)
    // console.log(maps)
    // console.log(mapOptions)
    useEffect(() => {
        const allStages = stages.map(stage => stage.stageName.replace(":", "-").replace(" ", "-").replace(" ", "").toLowerCase())
        let allMaps: Map[] = []
        let allPickRates: PickRate[] = []
        const fetchMaps = async () => {
            for await (const stage of allStages) {
                setLoading(true)
                const mapPoolsResponse = await fetch(`/overwatch-league/2022/${stage}/map-pools`, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Network response was not OK: ${stage}`)
                    }
                    return response.json()
                }).catch((error) => {
                    console.error("There has been a problem with your fetch operation: ", error)
                })

                const heroUsageResponse = await fetch(`/overwatch-league/2022/${stage}/heroes-usage`, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Network response was not OK: ${stage}`)
                    }
                    return response.json()
                }).catch((error) => {
                    console.error("There has been a problem with your fetch operation: ", error)
                })

                const heroesTotalPlayedTime = await fetch(`/overwatch-league/2022/${stage}/heroes-total-played-time`, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Network response was not OK: ${stage}`)
                    }
                    return response.json()
                }).catch((error) => {
                    console.error("There has been a problem with your fetch operation: ", error)
                })

                for (const value of mapPoolsResponse) {
                    const mapName: string = value["map_name"]
                    const mapType: string = value["map_type"]
                    const stage: string = value["stage"]
                    const checkedState: boolean = true
                    let map: Map = {mapName: mapName, type: mapType, stage: stage, checkedState: checkedState}
                    allMaps.push(map)
                }
                let totalUsage = 0
                for (const value of heroUsageResponse) {
                    const hero: string = value["hero_name"]
                    const usage: number = Number(value["total_times_played"])
                    const check: boolean = allPickRates.some(object => object.heroName === hero)
                    if (check) {
                        const index = allPickRates.findIndex(object => {return object.heroName === hero})
                        allPickRates[index].usage += usage
                    }
                    else {
                        let pickRate: PickRate = {heroName: hero, usage: usage, playedTime: 0, pickRate: 0}
                        allPickRates.push(pickRate)
                    }
                    totalUsage += usage
                }
                let totalTime = 0
                for (const value of heroesTotalPlayedTime) {
                    const playedTime: number = Number(value["amount"])
                    const hero: string = value["hero_name"]
                    const index = allPickRates.findIndex(object => {return object.heroName === hero})
                    allPickRates[index].playedTime += playedTime
                    totalTime += playedTime
                }
                console.log(totalTime)
                for (const value of allPickRates) {
                    const pickRate: number = (value["usage"] / totalUsage)  / (value["playedTime"] / totalTime)
                    value["pickRate"] = pickRate
                }
            }
            setLoading(false)
        }
        fetchMaps()
        updateMaps(allMaps)
        updateOpponentPickRates(allPickRates)
        // console.log(leagueUsage)
    }, [])
    const updateTeamsProperties = (teamsList: string[]): void => {
        updateTeams(prevState => prevState.map((team) => {
            if (!teamsList.includes(team.teamName)) {
                return {...team, checkedState: false}
            }
            return {...team, checkedState: true}
        }))
        // console.log(teams)
    }

    const updateMapTypesProperties = (mapTypesList: string[]): void => {
        updateMapTypes(prevState => prevState.map((mapType) => {
            if (!mapTypesList.includes(mapType.typeName)) {
                return {...mapType, checkedState: false}
            }
            return {...mapType, checkedState: true}
        }))

        const updatedMapTypesList: string[] = mapTypes.filter((mapType) => {
            if (mapType.checkedState === true) {
                return mapType.typeName
            }
        }).map((mapType) => {return mapType.typeName})

        updateMaps(prevState => prevState.map((map) => {
            if (!updatedMapTypesList.includes(map.stage)) {
                return {...map, checkedState: false}
            }
            return {...map, checkedState: true}
        }))
    }

    const updateStagesProperties = (stagesList: string[]): void => {
        updateStages(prevState => prevState.map((stage) => {
            if (!stagesList.includes(stage.stageName)) {
                return {...stage, checkedState: false}
            }
            return {...stage, checkedState: true}
        }))
        const updatedStagesList: string[] = stages.filter((stage) => {
            if (stage.checkedState === true) {
                return stage.stageName
            }
        }).map((stage) => {return stage.stageName})
        updateMaps(prevState => prevState.map((map) => {
            if (!updatedStagesList.includes(map.stage)) {
                return {...map, checkedState: false}
            }
            return {...map, checkedState: true}
        }))
        // console.log(stages)
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
        updateMaps(prevState => prevState.map((map) => {
            if (!mapsList.includes(map.mapName) || !stagesList.includes(map.stage) || !mapTypesList.includes(map.type)) {
                return {...map, checkedState: false}
            }
            return {...map, checkedState: true}
        }))
    }

    return(
        <> { !loading &&
        <div>
            <TeamPicker listOfTeamNames={arrayOfTeamNames} parentFunction={updateTeamsProperties}/>
            <MapTypePicker listOfMapTypeNames={arrayOfMapTypesNames} parentFunction={updateMapTypesProperties}/>
            <StagePicker listOfStageNames={arrayOfStageNames} parentFunction={updateStagesProperties}/>
            <MapPicker listOfMaps={maps} listOfStages={stages} listOfMapTypes={mapTypes} parentFunction={updateMapsProperties}/>
            <LeagueUsage opponentPickRates={opponentPickRates}/>
        </div> }
        </>
    )
}


export default GlobalHeroUsage