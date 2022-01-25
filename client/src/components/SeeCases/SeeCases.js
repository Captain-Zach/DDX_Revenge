import React, { useEffect, useState } from "react";
import axios from "axios";
import Swarming from "../Swarming/Swarming";
import Popout from "react-popout";
import Focus from "./Focus";


const SeeCases = (props) => {

    const [state, setState] = useState([]);

    const [navigate, setNavigate] = useState("CaseList");

    // "Swarming" logic and workflows should be handled here.
    const refresh = () => {
        axios.get("http://localhost:8000/api/findCases/", {
            message: "Do I even need a body?"
        })
            .then(res => {
                console.log("Oh boy,", res.data);
                let quicklist = [];
                res.data.forEach(element => {
                    quicklist.push(element.srNumber);
                });
                console.log(quicklist);
                setState(quicklist);
                
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {

        refresh();
    }, []);

    const deleteCase = (caseNumber) => {
        axios.post("http://localhost:8000/api/deleteCase/", {
            target: caseNumber
        })
            .then(res => refresh())
            .catch(err => console.log(err));
    }

    const [caseNumber, setCaseNumber] = useState({

    })

    // const Focus = (target) => {
    //     useEffect(() => {

    //     }, [])
    //     return (
    //         <div>
    //             <p>This is focus</p>
    //         </div>
    //     )
    // }

    const [target, setTarget] = useState("");

    const spawnFocus = (element) => {
        
        setNavigate("Focus");
        setTarget(element);
        // Let's quickly grab our thoughts.
        // Change navigate to "Focus"
        // set 
    }
    

    

    const {test} = props;

    return(
        <div>
            {navigate == "CaseList"?<div>
                <h1>All Cases</h1>
            <button onClick={() => {test("Workflows")}}>Back</button>
            {state.map((element, index) =>  
                <div key={index}>
                    <p>CASE {element}: 
                    <button onClick={(e) => spawnFocus(element)}>Focus</button>
                    <button>Swarm</button>
                    {/* <button onClick={() => {console.log("Not so fast")}}>Close (disabled)</button> */}
                    <button onClick={() => {deleteCase(element)}}>Delete</button>
                    <button>Transfer</button></p>
                    
                </div>
            )}
            
            </div>:<div></div>}
            {navigate == "Focus"?<div>
                <Focus caseNumber={target}/>
            </div>:<div></div>}
            
            {/* <Focus></Focus> */}
        </div>
    )
}

export default SeeCases;