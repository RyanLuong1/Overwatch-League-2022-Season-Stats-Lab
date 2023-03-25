import React, { useState, useEffect } from 'react';
import {TextField, Autocomplete} from '@mui/material'
function TeamPicker(props: {listOfTeams: string[], parentFunction: Function}) {
    const [teams, updateTeams] = useState<string[]>(props.listOfTeams)

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
            options={[...props.listOfTeams]}
            disableCloseOnSelect
            getOptionLabel={(teamName) => teamName}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newArray) => handleChange(newArray)}
            defaultValue={[...props.listOfTeams]}
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