import React, {useEffect, useState} from 'react';
import axios from 'axios';


function Autopilot(props) {
    const [state, setState] = useState([]);

    const [current, setCurrent] = useState({
        srNumber: "",
        cxName: "",
        subscriptionId: "",
        internalTitle: "",

    });

    const [note, setNote] = useState({
        businessImpact:"",
        caseStatus:"",
        environment:"",
        expectedOutcome:"",
        issueDesc:"",
        nextAction:"",
        nextContact:"",
        srNumber:"",
        troubleshooting:""
    })

    const [email, setEmail] = useState({
        srNumber:"",
        body: ""
    });

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

                //Since we have res.data, and therefore have the case info...
                // let's make a current, setCurrent state object.
                let tempObject = res.data[0];
                setCurrent({
                    ...current,
                    srNumber: tempObject.srNumber,
                    cxName: tempObject.cxName,
                    subscriptionId: tempObject.subscriptionId,
                    internalTitle: tempObject.internalTitle
                });
                // We should do another Axios call for the latest email for the case
                // And grab the latest note while we're at it.
                axios.post("http://localhost:8000/api/latestEmail/", {
                    srNumber: tempObject.srNumber
                })
                .then (res => {
                    console.log(res);
                    setEmail({
                        ...email,
                        body:res.data[0].body,
                        srNumber:tempObject.srNumber
                    })
                    }).catch(err => console.log(err));
                
                // And here we should grab the most recent Note
                axios.post("http://localhost:8000/api/latestNote/", {
                    srNumber: tempObject.srNumber
                })
                    .then(res => {
                        console.log(res.data);
                        let tempHolder = res.data;
                        delete tempHolder[0]._id;
                        console.log("Tempholder: ", tempHolder);
                        setNote(...tempHolder);
                    }).catch( err=> console.log(err));
            })
            .catch(err => console.log(err));

        
    }

    useEffect(() => {
        // axios.post("http://localhost:8000/wipeout/", {})
        refresh();
    }, []);

    const next = () => {
        console.log("queueing up the next case");
        //Submit case changes. 
        axios.post("http://localhost:8000/api/updateCase/", current)
            .then(res => {console.log(res); })
            .catch(err => console.log(err));
        //Create Note
        axios.post("http://localhost:8000/api/createNote/", note)
            .then(res => {console.log(res);})
            .catch(err => console.log(err));
        //Create Email
        console.log("Here's an issue", email.srNumber);
        axios.post("http://localhost:8000/api/createEmail/", email)
            .then(res => {console.log(res); })
            .catch(err => console.log(err));
        
        // Now I need to pull case info in a callback chain, starting with the next case.
        state.shift();
        // we should get our case here.
        axios.post("http://localhost:8000/api/findCase/", {srNumber: state[0]})
            .then(res => {
                console.log(res.data);
                let tempHolder = res.data.case;
                delete tempHolder._id;
                setCurrent(tempHolder);
                console.log(tempHolder);
                // Now I need to get the latest email and latest note.
                axios.post("http://localhost:8000/api/latestEmail/", {
                    srNumber: tempHolder.srNumber
                })
                .then (res => {
                    console.log(res);
                    setEmail({
                        ...email,
                        body:res.data[0].body,
                        srNumber:tempHolder.srNumber
                    })
                    }).catch(err => console.log(err));
                
                // And here we should grab the most recent Note
                axios.post("http://localhost:8000/api/latestNote/", {
                    srNumber: tempHolder.srNumber
                })
                    .then(res => {
                        console.log(res.data);
                        let tempHolder = res.data;
                        delete tempHolder[0]._id;
                        console.log("Tempholder: ", tempHolder);
                        setNote(...tempHolder);
                    }).catch( err=> console.log(err));
            })
            .catch(err => console.log(err));

        console.log("prep work", state);
        setState(state);
    }

    const pullNote = () => {
        navigator.clipboard.writeText(`
SUMMARY
+++++++++++++++++++++++++++
[Issue Description] ${note.issueDesc}
[Business Impact] ${note.businessImpact}
[Expected Outcome] ${note.expectedOutcome}
+++++++++++++++++++++++++++
CASE SUMMARY
[Environment] ${note.environment}
[Troubleshooting] ${note.troubleshooting}
ACTION PLAN
Case Status: ${note.caseStatus}
Next Action: ${note.nextAction}
Next Contact: ${note.nextContact}`)
    }
    
    const pullEmail = () => {
        navigator.clipboard.writeText(email.body);
    }
    
    const pullTitle = () => {
        navigator.clipboard.writeText(current.internalTitle);
    }

    

    
    return ( 
        <div>
            <p>This is Autopilot</p>
            <p>SR Number: {current.srNumber}</p>
            <label>Customer Name: </label>
            <input type="text" name="cxName" value={current.cxName} onChange={(e) => setCurrent({...current, [e.target.name]:e.target.value})}/> <br/>
            <label>Sub ID: </label>
            <input type="text" name="subscriptionId" value={current.subscriptionId}  onChange={(e) => setCurrent({...current, [e.target.name]:e.target.value})}/> <br/>
            <label>Internal Title: </label>
            <input type="text" name="internalTitle" value={current.internalTitle} onChange={(e) => setCurrent({...current, [e.target.name]:e.target.value})} /> <br/>
            <label>Latest Email: </label> <br/>
            <textarea value={email.body} name="body" onChange={e => setEmail({srNumber:current.srNumber, [e.target.name]:e.target.value})}/> <br/>

            <label>Issue Description:</label><br/>
            <textarea value={note.issueDesc} name="issueDesc" onChange={(e) => setNote({...note, [e.target.name]:e.target.value})}/> <br/>
            <label>Business Impact:</label><br/>
            <textarea value={note.businessImpact} name="businessImpact" onChange={(e) => setNote({...note, [e.target.name]:e.target.value})}/> <br/>
            <label>Expected Outcome: </label><br/>
            <textarea value={note.expectedOutcome} name="expectedOutcome" onChange={(e) => setNote({...note, [e.target.name]:e.target.value})}/> <br/>
            <label name="environment">Environment:</label><br/>
            <textarea value={note.environment} name="environment" onChange={(e) => setNote({...note, [e.target.name]:e.target.value})}/> <br/>
            <label>Troubleshooting:</label><br/>
            <textarea value={note.troubleshooting} name="troubleshooting" onChange={(e) => setNote({...note, [e.target.name]:e.target.value})}/> <br/>
            <label>Case Status:</label><br/>
            <textarea value={note.caseStatus} name="caseStatus" onChange={(e) => setNote({...note, [e.target.name]:e.target.value})}/> <br/>
            <label>Next Action:</label><br/>
            <textarea value={note.nextAction} name="nextAction" onChange={(e) => setNote({...note, [e.target.name]:e.target.value})}/> <br/>
            <label>Next Contact:</label><br/>
            <input value={note.nextContact} type="date" name="nextContact" onChange={(e) => setNote({...note, [e.target.name]:e.target.value})}/> <br/>

            <button onClick={pullTitle}>Copy Title</button> <br/>
            <button onClick={pullEmail}>Copy Email</button> <br/>
            <button onClick={pullNote}>Copy Note</button> <br/>
            <button onClick={next}>Next!</button>
        </div>
     );
}

export default Autopilot;