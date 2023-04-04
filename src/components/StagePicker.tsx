import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Checkbox } from '@mui/material';

function StagePicker(props: {listOfStageNames: string[], parentFunction: Function}) {
    const [stagesName, updateStageNames] = useState<string[]>(props.listOfStageNames);
    
    const updateStageNamesHelper = (newArray) => {
        updateStageNames([...newArray])
        }

    // fetch("http://127.0.0.1:5000/bucket").then(response => response.text()).then(text => console.log(text))
    const handleChange = (newArray) => {
        updateStageNamesHelper(newArray)
        props.parentFunction(newArray)
    }

    return(
        <div>
            <p>
                Stage
            </p>
            <div>
            <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={props.listOfStageNames}
            disableCloseOnSelect
            getOptionLabel={(stageName) => stageName}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newArray) => handleChange(newArray)}
            defaultValue={props.listOfStageNames}
            style={{ width: 500 }}
            inputValue=""
            renderInput={(params) => (
                <TextField {...params} label={stagesName.length === 8 ? "All" : stagesName.length === 0 ? "" : "Multiple Values"}/>
            )}
            renderTags={(stageNames) => {
                return stageNames.length === 8 ? "All" : "Multiple Values"
            }}
            />
            </div>
        </div>
    )
}

export default StagePicker;