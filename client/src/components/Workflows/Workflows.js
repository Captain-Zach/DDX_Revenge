import React from "react";


const Workflows = (props) => {
    //Logic go here
    const {test} = props;


    function stateShift(inState){
        console.log("Hello world");
        test(inState);
    }

    
    // const {}
    return(
        // Nonsense go here
        <div>
            <p>Instructions: Simply click "New Case" to begin making a new case.</p>
            <button onClick={() => {stateShift("Autopilot")}}>Autopilot (serviceable)  </button>
            <button>CheckUp (non functional)</button>
            <p></p>
            <button onClick={() => {stateShift("NewCase")}}>New Case (functional)</button>
            <p></p>
            <button onClick={() => {stateShift("SeeCases")}}>See Cases (se mi functional)</button>
        
        </div>
    )
}

export default Workflows;