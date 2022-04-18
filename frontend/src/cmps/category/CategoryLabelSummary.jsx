

export const CategoryLabelSummary = ({ category }) => {

    const labelCounts = category.expenses.reduce((acc, expense) => {
        if (!expense.label) acc[0].count++
        else {
            const idx = acc.findIndex(el => el.id === expense.label.id)
            if (idx === -1) acc.push({ ...expense.label, count: 1 })
            else acc[idx].count++
        }
        return acc
    }, [{ id: '111', color: '#c4c4c4', count: 0 }])


    return (
        <section className="category-label-summary cell flex center">
            {labelCounts.map(label => {
                return (<div className="label" style={{ backgroundColor: label.color, flex: label.count }} key={label.id} ></div>)
            })}
        </section>
    )
}