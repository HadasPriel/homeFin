import { useState } from "react"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../../hooks/useEffectUpdate"
import { useToggle } from "../../hooks/useToggle"

import { ExpenseColList } from "./ExpenseColList"
import { ExpenseDescription } from "./ExpenseDescription"
import { ExpenseMenu } from "./ExpenseMenu"
import { Icon } from "../ui/Icon"



export const ExpensePreview = ({ expense, cotegoryId, updateExpense, deleteExpense, color, cols, updateLabel, removeLabel }) => {

    const [isMenuShow, setIsMenuShow] = useToggle(false)
    const [expenseToSave, setExpense] = useState({ ...expense })
    const account = useSelector(state => state.accountModule.currAcount)

    useEffectUpdate(() => {
        updateExpense(expenseToSave)
    }, [expenseToSave, updateExpense])

    const editExpenseRepeat = async () => {
        setExpense((prevState) => ({
            ...prevState,
            repeat: !prevState.repeat,
        }));
    }

    const editExpenseTime = async (date) => {
        setExpense((prevState) => ({
            ...prevState,
            cratedAt: date,
        }));
    }

    const onEditExpense = async (ev, newVal) => {
        const name = ev.target.getAttribute('name')

        if (name === 'amount') {
            setExpense((prevState) => ({
                ...prevState,
                sum: { ...prevState.sum, amount: newVal },
            }));
        } else {
            setExpense((prevState) => ({
                ...prevState,
                [name]: newVal,
            }));
        }
    }

    const onDeleteExpense = () => {
        deleteExpense(expenseToSave.id)
    }

    return (
        <section className="expense-preview-wrapper">

            {isMenuShow && <ExpenseMenu
                toggleExpenseMenu={setIsMenuShow}
                onDeleteExpense={onDeleteExpense}
                expenseDescription={expense.description} />}
            <button className="menu flex center" onClick={setIsMenuShow}>
                <Icon name="menu" />
            </button>
            <section className="expense-preview flex row-container ">
                <ExpenseDescription expenseToSave={expenseToSave} onEditExpense={onEditExpense} color={color} cotegoryId={cotegoryId} />
                <ExpenseColList
                    cols={cols}
                    expenseToSave={expenseToSave}
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

