import React from 'react';


function Case(props) {

    const {title, number} = props;

    return ( 
            <a href={'hub/'+number}>{number}  |  {title} </a>
     );
}

export default Case;