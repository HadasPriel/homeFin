import { useToggle } from "../../hooks/useToggle.js"
import { PricePreview } from "../ui/PricePreview"
import { CategorySumMenu } from "./CategorySumMenu"


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
                <PricePreview sum={expensesSum} currency={currency} />
                <span className="measure-unit" >budget: {expected}</span>
            </section>



        </section>
    )
}
