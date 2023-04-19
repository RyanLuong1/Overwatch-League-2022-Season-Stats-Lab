import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"
import React from "react"
import { PickRate } from "./PickRate"

const LeagueUsage = (props: {opponentPickRates: PickRate[]}) => {
    const data = []
    // for (const value of props.oppoentPickRate) {

    // }
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