import React from 'react';

function Note(props) {

    const {createNote, noteInput} = props;

    return ( 
        <div>
            <p>Go ahead and add time once this is filled out, then hit save and paste the note</p>
            <label>Issue Description:</label><br/>
            <textarea name="issueDesc" onChange={noteInput}/> <br/>
            <label>Business Impact:</label><br/>
            <textarea name="businessImpact" onChange={noteInput}/> <br/>
            <label>Expected Outcome:</label><br/>
            <textarea name="expectedOutcome" onChange={noteInput}/> <br/>
            <label name="environment">Environment:</label><br/>
            <textarea name="environment" onChange={noteInput}/> <br/>
            <label>Troubleshooting:</label><br/>
            <textarea name="troubleshooting" onChange={noteInput}/> <br/>
            <label>Case Status:</label><br/>
            <textarea name="caseStatus" onChange={noteInput}/> <br/>
            <label>Next Action:</label><br/>
            <textarea name="nextAction" onChange={noteInput}/> <br/>
            <label>Next Contact:</label><br/>
            <input type="date" name="nextContact" onChange={noteInput}/> <br/>
            <button onClick={createNote}>Save</button>
        </div>
     );
}

export default Note;