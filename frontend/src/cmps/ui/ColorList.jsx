import { useClickOutside } from '../../hooks/useClickOutside.js'

export const ColorList = ({ className, func, setIsListShow }) => {

    
    var elList = useClickOutside(setIsListShow)



    return (
        <section className={`color-list flex ${className}`} ref={elList} >

            {[...Array(20)].map((val, idx) => <label
                className="color-label"
                key={idx}
                style={{ backgroundColor: `var(--lb${idx + 1}_bright)` }}>
                <input type="radio"
                    name="color"
                    value={`lb${idx + 1}_bright`}
                    onChange={func} />
            </label>)}
        </section>
    )
}

