import allStates from 'util/allStates';
import { useState } from 'react';

function StateInput(props) {
    let { setState, state } = props;
    let [currState, setCurrState] = useState('');

    let handleChange = (event) => {
        setState(event.target.value);
    };

    return (
        <div className="w-full">
            <label htmlFor="state" className="block text-black mb-2">State</label>
            <select 
                id="state" 
                value={state} 
                onChange={(event) => handleChange(event)} 
                className="w-full border rounded p-2"
            >
                {allStates.map((element, index) => (
                    <option key={index} value={element}>{element}</option>
                ))}
            </select>
        </div>
    )
};

export default StateInput;
