import { useEffect, useRef } from "react";

export const UseEffectUpdate = (callback) => {
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        callback();
    }, [callback]);
}
