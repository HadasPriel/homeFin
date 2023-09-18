import { useRef, useEffect } from 'react';

export const useClickOutside = (func) => {
    const ref = useRef()


    useEffect(() => {
        if (!ref?.current) return


        const onClickOutside = (ev) => {
            if (ref.current || !ref.current.contains(ev.target)) {
                func()
            }
        }
        const onClickEsc = (ev) => {
            //for Escape key:
            if (ev.keyCode === 27) func(false)
        }
        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("touchstart", onClickOutside);
        document.addEventListener("keydown", onClickEsc);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("touchstart", onClickOutside);
            document.removeEventListener("keydown", onClickEsc);
        }
        // eslint-disable-next-line
    }, [])

    return ref
}
