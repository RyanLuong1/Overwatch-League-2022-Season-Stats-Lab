import React, { useState, useEffect } from 'react';

function TeamPicker() {
    const [teamName, setTeamName] = useState("Atlanta Reign");
    
    return(
        <div>
            <p>
                Team
            </p>
            <select name="team">
                <option value="Atlanta Reign"> Atlanta Reign </option>
                <option value="Boston Uprising"> Boston Uprising </option>
                <option value="Chengdu Hunter"> Chengdu Hunters </option>
                <option value="Dallas Fuel"> Dallas Fuel </option>
                <option value="Florida Mayhem"> Florida Mayhem </option>
                <option value="Guangzhou Charge"> Guangzhou Charge </option>
                <option value="Hangzhou Spark"> Hangzhou Spark </option>
                <option value="Houston Outlaws"> Houston Outlaws </option>
                <option value="London Spitfire"> London Spitfire </option>
                <option value="Los Angeles Gladiators"> Los Angeles Gladiators </option>
                <option value="Los Angeles Valiant"> Los Angeles Valiants </option>
                <option value="New York Excelsior"> New York Excelsior </option>
                <option value="San Francisco Shock"> San Francisco Shock </option>
                <option value="Seoul Dynasty"> Seoul Dynasty </option>
                <option value="Seoul Infernal"> Seoul Infernal </option>
                <option value="Shanghai Dragons"> Shanghai Dragons </option>
                <option value="Toronto Defiant"> Toronto Defiant </option>
                <option value="Vancouver Titans"> Vancouver Titans </option>
                <option value="Vegas Eternal"> Vegas Eternal </option>
                <option value="Washington Justice"> Washington Justice </option>
            </select>
        </div>
    )
}

export default TeamPicker;