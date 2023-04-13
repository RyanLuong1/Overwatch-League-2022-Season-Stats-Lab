import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"
import React from "react"
import { HeroUsage } from "./HeroUsage"

const LeagueUsage = (props: {leagueUsage: HeroUsage[]}) => {
    const total = props.leagueUsage.map(hero => hero.usage).reduce((prev, current) => prev + current, 0)
    console.log(total)
    const data = props.leagueUsage.sort(
        (object1, object2) => (object1.usage < object2.usage) ? 1 : (object1.usage > object2.usage) ? -1 : 0
    )
    return (
        <BarChart width={1500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="heroName" />
        <Tooltip />
        <Legend />
        <Bar dataKey="usage" fill="#8884d8" />
        </BarChart>
            )
}

export default LeagueUsage