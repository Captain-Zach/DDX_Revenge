import React, { useEffect, useState} from 'react';
import axios from "axios";
import Case from './Case';


function CaseList(){

    const [state, setState] = useState([]);

    const getList = () => {
        axios.get("http://localhost:8000/api/findCases/", {
            message: "g'day!"
        })
            .then(res => {
                // console.log("Response: ", res.data);
                let quickList = [];
                res.data.forEach(element => {
                    quickList.push({number: element.srNumber, caseTitle: element.internalTitle});
                });
                // console.log(quickList);
                setState(quickList);
            })
            .catch(err => { console.log("Uh oh!", err)});

    }

    useEffect(async () => {
        getList();
        console.log(state);
    }, []);

    return ( 
        <div>
            <h4>Case List</h4>
            {state.length > 0 ? 
                <div>
                    {state.map((element, index) => 
                        <div>
                            <Case key={index} title={element.caseTitle} number={element.number} />
                        </div>
                    )}
                </div>: <div>No cases</div>
            }


        </div>
     );
}

export default CaseList;