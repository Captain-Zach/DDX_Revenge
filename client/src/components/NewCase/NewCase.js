import React, { useState } from "react";
import axios from 'axios';
import Init from "./Init";
import Note from "./Note";
// import { createEmail } from "../../../../server/controllers/case.controller";

const NewCase = (props) => {

    // Style objects
    const mailBox = {
        width: "90vw",
    }
    // Everything else

    const {test} = props;

    const [navigate, setNavigate] = useState({
        tracker: "Init", // Will be the new tracker object
        phoneCall: false, // Sets the 

    })

    const [state, setState] = useState({
        srNumber:"",
        cxName:"",
        subscriptionId:"",
        internalTitle:"",
    });

    const [note, setNote] = useState({
        srNumber:"",
        issueDesc:"",
        businessImpact:"",
        expectedOutcome:"",
        environment:"",
        troubleshooting:"",
        caseStatus:"",
        nextAction:"",
        nextContact:"",
    });

    const [email, setEmail] = useState({
        srNumber:"",
        body:""
    })

    const grabNote = () => {
        return `SUMMARY
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
Next Contact: ${note.nextContact}
`
    }

    const [tracker, setTracker] = useState("Init");

    const inputTracker = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state);
    }

    const noteInput = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
            srNumber: state.srNumber
        });
        console.log(note);
    }

    const createNote = () => {

        // I need to parse the note, then copy to clipboard.
        axios.post("http://localhost:8000/api/createNote/", note)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        navigator.clipboard.writeText(grabNote());
        test("Workflows")
    }

    const textDraft = () => {return `Hello ${state.cxName},

My name is Zachary and I am the Microsoft Support Engineer who will be working with you on support request ${state.srNumber}. You can reach me using the contact information in my signature.
        
// Insert personalized questions, message, etc, here. OFFER TO CALL!!!

// Ensure scope agreement. "It looks like the problem is…" "I think the problem is…" "Is the problem…" "… if that's incorrect, please let me know and I'll correct my assumption.

${stub.body}
        
Thank you for your time, 
Zachary Jones
zacharyjones@microsoft.com
9:00AM - 6:00PM PST
(980) 776-1269
Manager: allison.geoghegan@microsoft.com`}

    const createCase = (phoneFlag) => {
        if(phoneFlag){
            console.log("phone flag");
            axios.post("http://localhost:8000/api/newCase/", {
                ...state
            })
                .then(res => {
                    console.log(res.data.message);
                    // test("Workflows");
                })
                .catch(err => {
                    test("Workflows");
                    // console.log(err);
                });
            // do this if the customer wants phone calls over emails. 
            // Draft a stub,
            // setTracker to "Stub"
            // populate stub (in the body of this component) if "Stub"
            // include stub in the follow up email.
            navigator.clipboard.writeText(state.internalTitle);
            setTracker("Stub");
            return;
        }
        // Need to add a workflow for deciding how to do this.
        axios.post("http://localhost:8000/api/newCase/", {
            ...state
        })
            .then(res => {
                console.log(res.data.message);
                // test("Workflows");
            })
            .catch(err => {
                test("Workflows");
                // console.log(err);
            });
        


        setEmail({
            srNumber: state.srNumber,
            body: textDraft()
        });
        setTracker("Email");
        console.log(email.body);

        navigator.clipboard.writeText(state.internalTitle);
    }

    const saveEmail = () => {
        navigator.clipboard.writeText(email.body);
        axios.post("http://localhost:8000/api/createEmail/", email)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        setTracker("Note");

    }


    const updateEmail = (e) => {
        console.log(email);
        setEmail({
            ...email,
            body: e.target.value,
            srNumber: state.srNumber
        })
    }

    // Stub handling
    const exampleStub = `"Hello, this is Zach Jones from Azure Media||Communication services.  I'm calling to follow up on a case you opened earlier. Do you have a moment to talk about this for a moment?"


    Can you tell me what's going on? [Issue Description]:
    
    Could you tell me how this is impacting your business? [Business Impact]: 
    
    Is this in your production environment? [Environment]:
    
    
    ***Things you talked about***
    
    
    
    *****************************
    
    "I'm going to go ahead and follow up this call with an email. Going forward, what's the best way for us to communicate?"
    
    Managing expectations:`

    const [stub, updateStub] = useState({
        srNumber: "",
        body: exampleStub

    })
    const inputStub = (e) => {
        updateStub({
            ...stub,
            body: e.target.value,
            srNumber: state.srNumber
        });
        console.log(stub);
    }

    const createStub = () => {
        axios.post("http://localhost:8000/api/createStub/", stub)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        setTracker("Email");
        // createStub(false);
    }

    

    return(
        <div>
            {tracker == "Init"? <Init inputTracker={inputTracker} createCase={createCase}/>: <div></div>}
            {tracker == "Email"? <div>
                <textarea defaultValue={textDraft()} onChange={(e) => updateEmail(e)}/>
                <br/>
                <button onClick={saveEmail}>Save</button>
            </div>:<div></div>}
            {tracker == "Note"?<div><Note createNote={createNote} noteInput={noteInput}/></div>:<div></div>}
            {tracker == "Stub"?<div>
                <p>Initial Call: </p>
                <textarea defaultValue={exampleStub} onChange={inputStub}></textarea>
                <button onClick={createStub}>Submit</button>
            </div>:<div></div>}
            

            
        </div>
    )
}

export default NewCase;