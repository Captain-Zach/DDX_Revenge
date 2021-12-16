import React, { useEffect, useState } from "react";
import Workflows from "./Workflows/Workflows";
import NewCase from "./NewCase/NewCase";
import SeeCases from "./SeeCases/SeeCases";
import Autopilot from "./Autopilot/Autopilot";

const Main = (props) => {
    //Logic go here
    
    const [state, setState] = useState({
        state: "Workflows",
        
    });

    useEffect(() => {

    }, []);

    const greatSwitcheroo = (inState) => {
        console.log("It's a great switcheroo!")
        console.log(inState)
        // This can be refactored as simply as setState({state: inState}); 
        // Keeping this currently, as this prevents us from passing bad data.
        switch(inState){
            case "NewCase":
                setState({state: "NewCase"});
                break;
            case "Autopilot":
                setState({state: "Autopilot"});
                break;
            case "CheckUp":
                setState({state: "CheckUp"});
                break;
            case "Focus":
                setState({state: "Focus"});
                break;
            case "Swarming":
                setState({state: "Swarming"});
                break;
            case "TransferCase":
                setState({state: "TransferCase"});
                break;
            case "CloseCase":
                setState({state: "CloseCase"});
                break;
            case "SeeCases":
                setState({state: "SeeCases"});
                break;
            case "Workflows":
                setState({state: "Workflows"});
                break;
            default: break;

        }
        // setState({state: "NewCase"})
    }
    return(
        // Nonsense go here
        <div>
            { state.state == "Workflows" ? <div><Workflows test={greatSwitcheroo}/></div>:<div/>}
            { state.state == "NewCase" ? <div><NewCase test={greatSwitcheroo}/></div>:<div/>}
            { state.state == "SeeCases" ? <div><SeeCases test={greatSwitcheroo}/></div>:<div/>}
            { state.state == "Autopilot" ? <div><Autopilot test={greatSwitcheroo}/></div>:<div/>}
            {/* { state.state == "Swarming" ? <div><Swarming test={greatSwitcheroo}/></div>:<div/>} */}
            {/* { state.state == "Workflows" ? <div><Workflows/></div>:<div/>}
            { state.state == "Workflows" ? <div><Workflows/></div>:<div/>}
            { state.state == "Workflows" ? <div><Workflows/></div>:<div/>}
            { state.state == "Workflows" ? <div><Workflows/></div>:<div/>}
            { state.state == "Workflows" ? <div><Workflows/></div>:<div/>} */}
        </div>
    )
}

export default Main;