
import { useState, useEffect, useRef } from 'react'
import { utilService } from '../../services/util.service.js'


export const Sky = () => {
    const [isSky, setIsSky] = useState(false)
    const elSky = useRef()

    useEffect(() => {
        setIsSky(!!elSky)
    }, [elSky.current])

    const skyPadding = 20

    const getWidth = (num) => {
        num = (num > 3) ? num * 0.35 : num
        return `${num}px`
    }


    return (
        <div className='sky' ref={elSky}>
            {isSky && [...Array(13)].map((__, idx) =>
                <div
                    key={idx}
                    className='stary'
                    style={{
                        top: `${utilService.getRandomInt(skyPadding, elSky.current?.clientHeight - skyPadding)}px`,
                        right: `${utilService.getRandomInt(skyPadding, elSky.current?.clientWidth - skyPadding)}px`,
                        '--animation-delay': idx * 200
                    }} >
                    <span className='vertical' style={{ width: getWidth(idx) }}></span>
                    <span className='horizontal' style={{ width: getWidth(idx) }}></span>
                </div>)}
        </div>
    )
}