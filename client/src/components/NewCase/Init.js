import React, { useState } from 'react';



function Init(props) {

    const {inputTracker, createCase} = props;
    const scoop = () => {
        let date = new Date();
        let title = ` [AMS/ACS] _${date.getMonth() + 1}/${date.getDate()} Internal Title`;

        console.log(title);
        return title;
    }

    
    const [state, setState] = useState(false);
    
    return ( 
        <div>
            <label>SR Number: </label>
            <input name="srNumber" type="text" onChange={(e) => {inputTracker(e)}}/> <br/>
            <label>Cx First Name: </label>
            <input name="cxName" type="text" onChange={(e) => {inputTracker(e)}}/> <br/>
            <label>Sub ID: </label>
            <input name="subscriptionId" type="text" onChange={(e) => {inputTracker(e)}}/> <br/>
            <label>Internal Title:</label>
            <input name="internalTitle" type="text" defaultValue={scoop()} onChange={(e) => {inputTracker(e)}}/> <br/>
            <label>Phone Call?</label>
            <input type="checkbox" onChange={(e) => {setState(!state); console.log(state)}} />
            <button onClick={() => {createCase(state)}}>Assign</button>
        </div>
     );
}

export default Init;