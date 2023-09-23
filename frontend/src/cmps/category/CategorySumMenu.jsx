import { useState } from "react"
import { useClickOutside } from "../../hooks/useClickOutside.js"
import { useAutoFocus } from "../../hooks/useAutoFocus.js"

export const CategorySumMenu = ({ setIsMenuShow, expected, updateCategoryExpected, expensesSum, codeSymbolCurrencyMap, accountCurrency, updateCurrency }) => {

    const [expectedToSave, setExpectedToSave] = useState(expected || '')

    var elMenu = useClickOutside(setIsMenuShow)

    const elExpected = useAutoFocus()

    const onSetExpectedToSave = (ev) => {
        setExpectedToSave(ev.target.value)
    }

    const onUpdateExpected = async (ev) => {
        updateCategoryExpected(ev, +expectedToSave)
    }

    const onUpdateCurrency = async (ev) => {
        updateCurrency(ev.target.value)
    }

    var currencyCodes = Object.keys(codeSymbolCurrencyMap)
    var currencySymbols = Object.values(codeSymbolCurrencyMap)


    return (
        <form
            className="category-sum-menu"
            name="expected"
            ref={elMenu} >

            <fieldset className="field expected-field">
                <legend className="title" >Expexted expense</legend>
                <div className="input-container">
                    <input
                        ref={elExpected}
                        className="input-item expected"
                        type="number"
                        placeholder="Insert expected sum"
                        name="expected"
                        value={expectedToSave}
                        onChange={onSetExpectedToSave}
                    />
                    <button className="btn suc" type="button" name="expected" onClick={onUpdateExpected} > set </button>
                </div>
            </fieldset>

            <fieldset className="field">
                <legend className="title">Currency</legend>
                <div className="input-container flex">
                    {currencyCodes.map((currency, idx) =>
                        <label className={`input-item ${accountCurrency === currency ? 'active' : ''} `} key={currency} onClick={onUpdateCurrency}> {currencySymbols[idx]}
                            <input type="radio" value={currency} onChange={onUpdateCurrency} hidden />
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