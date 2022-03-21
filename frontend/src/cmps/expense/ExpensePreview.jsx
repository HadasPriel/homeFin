import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { format } from 'date-fns'
import { DatePicker } from "../ui/date-picker";
import { UserList } from "../ui/UserList";
import { UserImg } from "../ui/UserImg";


export const ExpensePreview = ({ expense, updateExpense, deleteExpense, color }) => {

    const [expanseToSave, setExpanse] = useState({ ...expense })
    const [isDateShow, setIsDateShow] = useState(false)
    const [isEditSum, setIsEditSum] = useState(false)
    const [isByUserShow, setIsByUserShow] = useState(false)
    const account = useSelector(state => state.accountModule.currAcount)


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

    useEffect(() => {
        // console.log('run', expanseToSave.repeat);
        updateExpense(expanseToSave)
    }, [expanseToSave, updateExpense])

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
    }

    const eidtExpenseRepeat = async (date) => {
        setExpanse((prevState) => ({
            ...prevState,
            repeat: !prevState.repeat,
        }));
    }

    const eidtExpenseTime = async (date) => {
        setExpanse((prevState) => ({
            ...prevState,
            cratedAt: date,
        }));
    }

    const eidtExpenseAmount = async (date) => {
        setExpanse((prevState) => ({
            ...prevState,
            cratedAt: date,
        }));
    }

    const onEidtExpense = async (ev, newVal) => {
        const name = ev.target.getAttribute('name')
        setExpanse((prevState) => ({
            ...prevState,
            [name]: newVal,
        }));
    }

    const onDeleteExpense = () => {
        deleteExpense(expanseToSave.id)
    }

    const toggleDatePicker = () => {
        setIsDateShow(prevIsShow => !prevIsShow)
    }
    const toggleByUser = () => {
        setIsByUserShow(prevIsShow => !prevIsShow)
    }


    return (
        <section className="expense-preview flex row-container ">
            <div className="menu-wrapper flex center">
                <div className="menu flex center" onClick={onDeleteExpense}></div>
            </div>

            <div className="first-cell flex align-center" >
                <span className="before" style={{ backgroundColor: `var(--${color})` }} ></span>
                <p className="description" name="description" suppressContentEditableWarning={true} contentEditable onBlur={eidtExpense}>{expanseToSave.description}</p>
            </div>
            <div className=" flex">
                <div className={`repeated cell flex center ` + ((expanseToSave.repeat) ? 'confirme' : 'decline')} onClick={eidtExpenseRepeat} ></div>
                <div className={`cell flex center ` + ((currency.current === '$') ? `row-re` : '')}>
                    {!isEditSum && <div >{expanseToSave.sum.amount}</div>}
                    {isEditSum && <form onSubmit={eidtExpenseAmount}> <input name="amount" type="number" value={expanseToSave.sum.amount} /></form>}
                    <div >{currency.current}</div>
                </div>
                <div className="cell flex center">...</div>
                <div className="cell flex center">
                    <span className="date flex center" onClick={toggleDatePicker}>
                        {format(new Date(expanseToSave.cratedAt), 'dd.MM')}
                    </span>
                    {isDateShow && <DatePicker setIsDateShow={setIsDateShow} eidtExpenseTime={eidtExpenseTime} />}
                </div>
                <div className="cell flex center" onClick={toggleByUser}>
                    <UserImg user={expanseToSave.byUser} />
                    {isByUserShow && <UserList members={account.members} expenseMember={expanseToSave.byUser} eidtExpense={onEidtExpense} />}
                </div>
            </div>

        </section>
    )
}

