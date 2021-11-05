import React, {useState} from 'react';

import Select from 'react-select';

export default () => {
    const [selections, setSelections] = useState([]);

    const options = [
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' }
    ];

    const handleInputChange = (e) => {
        setSelections(Array.isArray(e) ? e.map(x => x.value) : []);
        
    };

    return (
        <div>

        <Select
        defaultValue={[{ value: 'orange', label: 'Orange', color: '#FF8B00' }]}
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleInputChange}
        />
        {selections}
        </div>
    );
};
