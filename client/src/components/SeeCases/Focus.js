import React, { useEffect, useState } from 'react';
import axios from "axios";

const Focus = (props) => {

    const {caseNumber} = props;

    const [body, setBody] = useState("Hello World");

    const [stubs, setStubs] = useState([]);
    // The Focus component brings up a list of all stubs, with the option to create a new stub
    // It receives caseNumber, from which it looks up all associated stubs.

    useEffect(() => {
        console.log(caseNumber);
        // Get all stubs related to caseNumber prop
        axios.post("http://localhost:8000/api/caseStubs/", {
            target: caseNumber
        }) 
            .then(res => {setStubs(res.data); console.log(res.data)})
            .catch(err => console.log(err));
    }, [])

    const refresh = () => {
        axios.post("http://localhost:8000/api/caseStubs/", {
            target: caseNumber
        }) 
            .then(res => {setStubs(res.data); console.log(res.data)})
            .catch(err => console.log(err));

    }

    const createStub = () => {
        axios.post("http://localhost:8000/api/createStub/", {
            srNumber: caseNumber,
            body: body
        })
        refresh();
    };    

    return (
        <div>
            <textarea value={body} onChange={(e) => setBody(e.target.value)}/>
            <button onClick={createStub}>New Stub</button>
            {stubs.length > 0? <div>
                {stubs.map((element, index) => 
                <div key={index}>
                    {element.srNumber} <button onClick={() => setBody(element.body)}>Load</button>
                </div>
            )}
            </div>:<div></div>}
            
        </div>
    )
}

export default Focus;