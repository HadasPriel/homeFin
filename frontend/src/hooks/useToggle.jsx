import { useState, useEffect } from 'react';

export const useToggle = (initialState = false, ref = null) => {
    const [state, setState] = useState(initialState);

    const toggle = () => setState(state => !state)

    useEffect(
        () => {
            if (!ref) return
            const onClickOutside = (ev) => {
                if (!ref.current || ref.current.contains(ev.target)) {
                    return
                }
                setState(false)
            };
            const onClickEsc = (ev) => {
                //for Escape key:
                if (ev.keyCode === 27) setState(false)
            };
            document.addEventListener("mousedown", onClickOutside);
            document.addEventListener("touchstart", onClickOutside);
            document.addEventListener("keydown", onClickEsc);
            return () => {
                document.removeEventListener("mousedown", onClickOutside);
                document.removeEventListener("touchstart", onClickOutside);
                document.removeEventListener("keydown", onClickEsc);
            };
            // eslint-disable-next-line
        }, [])

    return [state, toggle]
}