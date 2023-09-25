import { useState } from 'react';

export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);

    const toggle = (bool) =>{ 
        setState(state => (typeof bool === 'boolean') ?  bool : !state)
    }

    return [state, toggle]
}