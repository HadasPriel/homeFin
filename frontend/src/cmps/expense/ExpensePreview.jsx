import { useState } from "react"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../../hooks/useEffectUpdate"

import { ExpenseColList } from "./ExpenseColList"
import { ExpenseDescription } from "./ExpenseDescription"
import { Icon } from "../ui/Icon"



export const ExpensePreview = ({ expense, updateExpense, deleteExpense, color, cols, updateLabel, removeLabel }) => {

    const [expanseToSave, setExpanse] = useState({ ...expense })
    const account = useSelector(state => state.accountModule.currAcount)

    useEffectUpdate(() => {
        updateExpense(expanseToSave)
    }, [expanseToSave, updateExpense])

    const editExpenseRepeat = async () => {
        setExpanse((prevState) => ({
            ...prevState,
            repeat: !prevState.repeat,
        }));
    }

    const editExpenseTime = async (date) => {
        setExpanse((prevState) => ({
            ...prevState,
            cratedAt: date,
        }));
    }

    const onEditExpense = async (ev, newVal) => {
        const name = ev.target.getAttribute('name')

        if (name === 'amount') {
            setExpanse((prevState) => ({
                ...prevState,
                sum: { ...prevState.sum, amount: newVal },
            }));
        } else {
            setExpanse((prevState) => ({
                ...prevState,
                [name]: newVal,
            }));
        }
    }

    const onDeleteExpense = () => {
        deleteExpense(expanseToSave.id)
    }

    return (
        <section className="expense-preview-wrapper">
            <button className="menu flex center" onClick={onDeleteExpense}>
                <Icon name="menu-icon" />
            </button>
            <section className="expense-preview flex row-container ">
                <ExpenseDescription expanseToSave={expanseToSave} onEditExpense={onEditExpense} color={color} />
                <ExpenseColList
                    cols={cols}
                    expanseToSave={expanseToSave}
                    onEditExpense={onEditExpense}
                    account={account}
                    editExpenseTime={editExpenseTime}
                    editExpenseRepeat={editExpenseRepeat}
                    updateLabel={updateLabel}
                    removeLabel={removeLabel} />
                <div className="last-cell cell flex center"></div>
            </section>
        </section>
    )
}

