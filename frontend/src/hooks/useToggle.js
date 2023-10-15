import { useState } from 'react';

export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);

    // If a boolean value is sent to the function, assign that value. Otherwise, toggle the existing value.
    const toggle = (bool) => {
        setState(state => (typeof bool === 'boolean') ? bool : !state)
    }

    return [state, toggle]
}