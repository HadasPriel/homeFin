

export const ExpenseLabelPreview = ({ label, onEditExpense, setIsEditShow }) => {

    const onEditLabel = (ev) => {
        onEditExpense(ev, label)
        setIsEditShow()
    }

    return (
        <label
            onChange={onEditLabel}
            className="label-preview flex justify-center align-center"

            style={{ backgroundColor: `${label.color}` }} >
            {label.txt}
            <input
                name="label"
                type="radio"
                style={{ display: 'none' }}
                value={label} ></input>
        </label>
    )
}

