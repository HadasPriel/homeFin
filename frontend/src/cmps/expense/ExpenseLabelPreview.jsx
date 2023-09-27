import { useForm } from "../../hooks/useForm.js"
import { useToggle } from "../../hooks/useToggle.js"
import { ColorList } from "../ui/ColorList"


export const ExpenseLabelPreview = ({ isEditLabelShow, label, onEditExpense, setIsEditShow, updateLabel, removeLabel }) => {

    const [labelToEdit, setLabelToEdit] = useForm(label)
    const [isColorShow, setIsColorShow] = useToggle(false)

    const onUpdateLabel = () => {
        console.log('onUpdateLabel');
        if (labelToEdit.txt === label.txt && labelToEdit.color === label.color) return
        updateLabel(labelToEdit)
    }


    const onEditLabel = (ev) => {
        onEditExpense(ev, label)
        setIsEditShow()
    }

    const onRemoveLabel = () => {
        removeLabel(label.id)
    }

    const bgColor = `var(--${label?.color || 'lb18_bright'})`
    const bgEditColor = `var(--${labelToEdit?.color || 'lb18_bright'})`


    return (
        <section>
            {!isEditLabelShow &&
                <div className="label-container flex aligh-center">
                    <label
                        onChange={onEditLabel}
                        className="label-preview label-show flex justify-center align-center"
                        style={{ backgroundColor: bgColor }} >
                        {(label.id === 'l101') ? '' : label.txt}
                        <input
                            name="label"
                            type="radio"
                            style={{ display: 'none' }}
                            value={label} />
                    </label>
                    {removeLabel && (label.id !== 'l101') && <button className="remove-btn x" onClick={onRemoveLabel}></button>}
                </div>
            }
            {isEditLabelShow &&
                <div className="label-preview label-edit flex" onBlur={onUpdateLabel} >
                    <button onClick={setIsColorShow} className="color-picker flex center" style={{ backgroundColor: bgEditColor }} ></button>
                    <input
                        type="text"
                        value={labelToEdit.txt}
                        name='txt'
                        onChange={setLabelToEdit}
                        placeholder="Add Label" />
                    {isColorShow && <ColorList func={setLabelToEdit} setIsListShow={setIsColorShow} />}
                </div>
            }
        </section>
    )
}

