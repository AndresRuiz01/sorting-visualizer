import './GridElement.css';
import React from 'react';

function GridElement({element_height, color}) {

    return <div className="grid-element" style={{height: element_height, backgroundColor: color}}>
           </div>
}

export default GridElement; 