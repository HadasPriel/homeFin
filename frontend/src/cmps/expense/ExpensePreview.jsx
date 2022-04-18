import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ExpenseColList } from "./ExpenseColList";
import { ExpenseDescription } from "./ExpenseDescription";



export const ExpensePreview = ({ expense, updateExpense, deleteExpense, color, cols }) => {

    const [expanseToSave, setExpanse] = useState({ ...expense })
    const account = useSelector(state => state.accountModule.currAcount)

    useEffect(() => {
        // console.log('run', expanseToSave);
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
        <section className="expense-preview flex row-container ">
            <div className="menu-wrapper flex center ">
                <div className="menu flex center sort-down" onClick={onDeleteExpense}></div>
            </div>
            <ExpenseDescription expanseToSave={expanseToSave} onEditExpense={onEditExpense} color={color} />
            <ExpenseColList
                cols={cols}
                expanseToSave={expanseToSave}
                onEditExpense={onEditExpense}
                account={account}
                editExpenseTime={editExpenseTime}
                editExpenseRepeat={editExpenseRepeat} />
        </section>
    )
}

