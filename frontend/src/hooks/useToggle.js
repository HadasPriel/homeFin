import { useState } from 'react';

export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);

    const toggle = (bool) => setState(state => (bool === undefined) ? !state : bool)



    return [state, toggle]
}