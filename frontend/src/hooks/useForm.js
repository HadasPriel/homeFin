import { useState } from 'react';

export const useForm = (initialState) => {
    const [fields, setFields] = useState(initialState);


    const handleChange = (ev) => {
        if (!ev.target) return;
        var { name, value } = ev.target
        if (ev.target.type === 'number') value = +value
        setFields(prevState => { return { ...prevState, [name]: value } })
    }

    return [fields, handleChange]
}