import React, { useState, useEffect } from 'react';
import {TextField, Autocomplete} from '@mui/material'

function TeamPicker(props: {listOfTeamNames: string[], parentFunction: Function}) {
    const [teamsNames, updateTeamsNames] = useState<string[]>(props.listOfTeamNames)

    const updateTeamsNamesHelper = (newArray) => {
        updateTeamsNames([...newArray])
    }

    const handleChange = (newArray) => {
        updateTeamsNamesHelper(newArray)
        props.parentFunction(newArray)
    }
    
    return(
        <div>
            <p>
                Team
            </p>
            <div>
            <Autocomplete
            multiple
            limitTags={2}
            id="checkboxes-tags-demo"
            options={props.listOfTeamNames}
            disableCloseOnSelect
            getOptionLabel={(teamName) => teamName}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newArray) => handleChange(newArray)}
            defaultValue={props.listOfTeamNames}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label={teamsNames.length === 20 ? "All" : teamsNames.length === 0 ? "" : "Multiple Values"}/>
            )}
            renderTags={(teamNames) => {
                return teamNames.length === 20 ? "All" : "Multiple Values"
            }}
            />
            </div>
        </div>
    )
}

export default TeamPicker;