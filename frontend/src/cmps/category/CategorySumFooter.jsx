import { useToggle } from "../../hooks/useToggle"
import { CategorySumMenu } from "./CategorySumMenu";


export const CategorySumFooter = ({ expected, color, expensesSum, onUpdateCategory, currency, updateCurrency }) => {

    const [isMenuShow, setIsMenuShow] = useToggle(false)


    const updateCategoryExpected = (ev, expectedToSave) => {
        onUpdateCategory(ev, expectedToSave)
        setIsMenuShow(false)
    }

    const codeSymbolCurrencyMap = {
        USD: '$', EUR: '€', NIS: '₪', Pound: '£'
    }

    return (
        <section className="category-sum-footer cell flex center"  >
            {isMenuShow &&
                <CategorySumMenu
                    updateCategoryExpected={updateCategoryExpected}
                    expensesSum={expensesSum}
                    expected={expected}
                    accountCurrency={currency}
                    codeSymbolCurrencyMap={codeSymbolCurrencyMap}
                    updateCurrency={updateCurrency}
                    setIsMenuShow={setIsMenuShow}
                />}
            <section className="sum flex col center" onClick={setIsMenuShow}>
                <span>
                    <span>{codeSymbolCurrencyMap[currency]}</span>
                    <span>{expensesSum}</span>
                </span>
                <span className="measure-unit" >sum</span>
            </section>



        </section>
    )
}
