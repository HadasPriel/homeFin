
export const PricePreview = ({ sum, currency }) => {


    const codeSymbolCurrencyMap = {
        USD: '$', EUR: '€', NIS: '₪', Pound: '£'
    }

    return (
        <span className={`flex ${((currency === 'USD') ? 'row-re' : '')}`}>
            <span>{sum}  </span>
            <span>{codeSymbolCurrencyMap[currency] || '$'}</span>
        </span>
    )
}
