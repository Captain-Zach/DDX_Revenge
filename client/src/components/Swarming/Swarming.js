import React, {useEffect, useState} from 'react';
import axios from 'axios';


function Swarming(props) {
    const [state, setState] = useState([]);

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
        // axios.post("http://localhost:8000/wipeout/", {})
        refresh();
    }, []);

    
    return ( 
        <div>

        </div>
     );
}

export default Swarming;