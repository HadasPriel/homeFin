import { ExpenseLabelPreview } from "./ExpenseLabelPreview"
import { useToggle } from "../../hooks/useToggle"
import { useClickOutside } from "../../hooks/useClickOutside.js"


export const ExpenseLabelEdit = ({ accountLabels, onEditExpense, setIsEditShow, updateLabel, removeLabel }) => {
    const [isEditLabelShow, setIsEditLabelShow] = useToggle(false)
    const [isAddLabel, setIsAddLabel] = useToggle(false)

    const elMenu = useClickOutside(setIsEditShow)


    const emptyLabel = { id: 'l101', txt: '', color: 'lb18_bright' }
    const newLabel = { id: '', txt: '', color: 'lb18_bright' }

    const onAddLabel = (label) => {
        updateLabel(label)
        setIsAddLabel()
    }


    return (
        <section className="expense-label-edit" ref={elMenu}>

            <div className={'label-list'}>
                {accountLabels.map(label =>
                    <ExpenseLabelPreview isEditLabelShow={isEditLabelShow} label={label} onEditExpense={onEditExpense} setIsEditShow={setIsEditShow} updateLabel={updateLabel} key={label.id} removeLabel={removeLabel} />
                )}
                <ExpenseLabelPreview isEditLabelShow={isEditLabelShow} label={emptyLabel} onEditExpense={onEditExpense} setIsEditShow={setIsEditShow} updateLabel={updateLabel} key={emptyLabel.id} />
                {isAddLabel && <ExpenseLabelPreview isEditLabelShow={isEditLabelShow} label={newLabel} onEditExpense={onEditExpense} setIsEditShow={setIsEditShow} updateLabel={onAddLabel} key={newLabel.id} />}
                {isEditLabelShow && <button onClick={setIsAddLabel} className="label-preview label-edit flex center btn solid">New label</button>}
            </div>

            <button className="edit-labels-btn btn solid flex center"
                onClick={setIsEditLabelShow}>{isEditLabelShow ? 'Applay' : 'Edit labels'}
            </button>

        </section>
    )
}

