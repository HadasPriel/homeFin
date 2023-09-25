import { utilService } from "../../services/util.service.js"
import { ExpenseLabelPreview } from "./ExpenseLabelPreview"
import { useToggle } from "../../hooks/useToggle.js"
import { useClickOutside } from "../../hooks/useClickOutside.js"


export const ExpenseLabelEdit = ({ accountLabels, onEditExpense, setIsEditShow, updateLabel, removeLabel }) => {

    const [isEditLabelShow, setIsEditLabelShow] = useToggle(false)
    const [isAddLabel, setIsAddLabel] = useToggle(false)

    const elMenu = useClickOutside(setIsEditShow)


    // const defaultLabel = { id: 'l101', txt: 'Default Label', color: 'lb18_bright' }
    const newLabel = { id: utilService.makeId(), txt: '', color: 'lb18_bright' }

    const onAddLabel = (label) => {
        updateLabel(label)
        setIsAddLabel(false)
    }


    return (
        <section className="expense-label-edit" ref={elMenu}>

            <div className='label-list'>
                {accountLabels.map(label =>
                    <ExpenseLabelPreview
                        key={label.id}
                        isEditLabelShow={isEditLabelShow}
                        label={label}
                        onEditExpense={onEditExpense}
                        setIsEditShow={setIsEditShow}
                        updateLabel={updateLabel}
                        removeLabel={removeLabel}
                    />)}

                {/* <ExpenseLabelPreview
                    key={defaultLabel.id}
                    isEditLabelShow={isEditLabelShow}
                    label={defaultLabel}
                    onEditExpense={onEditExpense}
                    setIsEditShow={setIsEditShow}
                    updateLabel={updateLabel}
                /> */}

                {isAddLabel &&
                    <ExpenseLabelPreview
                        key={newLabel.id}
                        isEditLabelShow={isEditLabelShow}
                        label={newLabel}
                        onEditExpense={onEditExpense}
                        setIsEditShow={setIsEditShow}
                        updateLabel={onAddLabel}
                    />}

                {isEditLabelShow && <button onClick={setIsAddLabel} className="label-preview label-edit flex center btn solid">New label</button>}
            </div>

            <button 
                className="edit-labels-btn btn solid flex center"
                onClick={setIsEditLabelShow}>
                    {isEditLabelShow ? 'Applay' : 'Edit labels'}
            </button>

        </section>
    )
}

