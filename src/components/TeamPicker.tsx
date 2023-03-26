import React, { useState, useEffect } from 'react';
import {TextField, Autocomplete} from '@mui/material'

function TeamPicker(props: {listOfTeamNames: string[], parentFunction: Function}) {
    const [teams, updateTeams] = useState<string[]>(props.listOfTeamNames)

    const updateTeamsHelper = (newArray) => {
        updateTeams([...newArray])
    }

    const handleChange = (newArray) => {
        updateTeamsHelper(newArray)
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
            id="checkboxes-tags-demo"
            options={[...props.listOfTeamNames]}
            disableCloseOnSelect
            getOptionLabel={(teamName) => teamName}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newArray) => handleChange(newArray)}
            defaultValue={[...props.listOfTeamNames]}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label={teams.length === 5 ? "All" : "Multiple Values"}/>
            )}
            />
            </div>
        </div>
    )
}

export default TeamPicker;