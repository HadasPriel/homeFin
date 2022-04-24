import { useSelector } from 'react-redux'

export const CategoryLabelSummary = ({ category }) => {

    const accountLabels = useSelector(state => state.accountModule.currAcount.labels)


    const labelCounts = category.expenses.reduce((acc, expense) => {
        if (!expense.label) acc[0].count++
        else {
            const idx = acc.findIndex(el => el.id === expense.label.id)
            if (idx === -1) acc.push({ ...expense.label, count: 1 })
            else acc[idx].count++
        }
        return acc
    }, [{ id: '111', color: 'lb18_bright', count: 0 }])


    return (
        <section className="category-label-summary cell flex center">
            {labelCounts.map(label => {
                const accountLabel = accountLabels.find(accountLabel => accountLabel.id === label.id)
                var color = `var(--${accountLabel?.color || 'lb18_bright'})`
                return <div className="label" style={{ backgroundColor: color, flex: label.count }} key={label.id} ></div>
            })}
        </section>
    )
}