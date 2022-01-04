import { useState, useRef } from "react";

export const ExpensePreview = ({ expense, updateExpense, deleteExpense }) => {

    const [expanseToSave, setExpanse] = useState({ ...expense })

    const currency = useRef(null)
    if (currency.current === null) {
        switch (expense.sum.currency) {
            case 'USA':
                currency.current = '$'
                break
            case 'ILS':
                currency.current = '₪'
                break
            default:
                currency.current = '₪'
        }
    }

    const eidtExpense = async (ev) => {
        const name = ev.target.getAttribute('name')
        if (name === 'amount') {
            setExpanse((prevState) => {
                var expense = { ...prevState }
                expense.sum.amount = +(ev.target.innerText)
                return expense
            });
        }
        else {
            setExpanse((prevState) => ({
                ...prevState,
                [name]: (ev.target.innerText),
            }));
        }
        updateExpense(expanseToSave)
    }


    const onDeleteExpense = () => {
        deleteExpense(expanseToSave.id)
    }



    return (
        <section className="expense-preview flex row-container">
            <div className="menu-wrapper flex center">
                <div className="menu flex center" onClick={onDeleteExpense}></div>
            </div>

            <div className="first-cell flex align-center">
                <p className="description" name="description" suppressContentEditableWarning={true} contentEditable onBlur={eidtExpense}>{expanseToSave.description}</p>
            </div>
            <div className="flex">
                <div className="cell flex center">...</div>
                <div className={`cell flex center ` + ((currency.current === '$') ? `row-re` : '')}>
                    <div name="amount" suppressContentEditableWarning={true} contentEditable onBlur={eidtExpense} >{expanseToSave.sum.amount}</div>
                    <div >{currency.current}</div>
                </div>
                <div className="cell flex center">...</div>
                <div className="cell flex center">{expanseToSave.cratedAt}</div>
                <div className="cell flex center">{expanseToSave.byUser.username}</div>
            </div>
        </section>
    )
}

