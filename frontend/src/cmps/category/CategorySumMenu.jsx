import { useState, useRef, useEffect } from "react"

export const CategorySumMenu = ({ expected, updateCategoryExpected, expensesSum }) => {

    const [expectedToSave, setExpectedToSave] = useState(expected || '')
    const elExpected = useRef(null)
    useEffect(() => {
        elExpected.current.focus()
    }, [])

    const onSetExpectedToSave = async (ev) => {
        setExpectedToSave(ev.target.value)
    }

    const updateExpected = async (ev) => {
        ev.preventDefault()
        updateCategoryExpected(ev, +expectedToSave)
    }

    var accountCurrency = { symbol: '₪', code: 'USD' }

    const currencies = [
        { symbol: '$', code: 'USD' },
        { symbol: '€', code: 'EUR' },
        { symbol: '₪', code: 'NIS' },
        { symbol: '£', code: 'Pound' },
    ]

    return (
        <form
            className="category-sum-menu"
            onSubmit={updateExpected}
            name="expected" >

            <fieldset className="field">
                <legend className="title" >Expexted expense</legend>
                <div className="input-container">
                    <input
                        ref={elExpected}
                        className="input-item"
                        type="number"
                        placeholder="Insert expected sum"
                        value={expectedToSave}
                        onChange={onSetExpectedToSave} />
                </div>
            </fieldset>

            <fieldset className="field">
                <legend className="title">Currency</legend>
                <div className="input-container flex">
                    {currencies.map(currency =>
                        <label className={`input-item ${accountCurrency.code === currency.code ? 'active' : ''} `} key={currency.code}> {currency.symbol}
                            <input type="radio" value={currency.code} hidden />
                        </label>
                    )}
                    <label className="input-item">
                        <input type="text" placeholder="type your own" />
                    </label>
                </div>
            </fieldset>

            <footer className="sum-menu-footer">
                <p className="title">Overall sum of column: {expensesSum} </p>
            </footer>

        </form>
    )
}