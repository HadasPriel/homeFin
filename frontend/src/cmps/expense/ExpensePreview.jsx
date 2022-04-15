import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useToggle } from "../../hooks/useToggle";
import { format } from 'date-fns'
import { DatePicker } from "../ui/date-picker";
import { UserList } from "../ui/UserList";
import { UserImg } from "../ui/UserImg";
import { ExpenseSum } from "./ExpenseSum";
import { ExpenseDescription } from "./ExpenseDescription";


export const ExpensePreview = ({ expense, updateExpense, deleteExpense, color }) => {

    const [expanseToSave, setExpanse] = useState({ ...expense })
    const [isDateShow, setIsDateShow] = useToggle(false)
    const [isByUserShow, setIsByUserShow] = useToggle(false)
    const account = useSelector(state => state.accountModule.currAcount)

    useEffect(() => {
        // console.log('run', expanseToSave.repeat);
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
            <div className=" flex">
                <div className={`repeated cell flex center ` + ((expanseToSave.repeat) ? 'confirme' : 'decline')} onClick={editExpenseRepeat} ></div>
                <ExpenseSum expanseToSave={expanseToSave} onEditExpense={onEditExpense} />
                <div className="cell flex center">...</div>
                <div className="cell flex center">
                    <span className="date flex center" onClick={setIsDateShow}>
                        {format(new Date(expanseToSave.cratedAt), 'dd.MM')}
                    </span>
                    {isDateShow && <DatePicker setIsDateShow={setIsDateShow} editExpenseTime={editExpenseTime} />}
                </div>
                <div className="cell flex center" onClick={setIsByUserShow}>
                    <UserImg user={expanseToSave.byUser} />
                    {isByUserShow && <UserList members={account.members} expenseMember={expanseToSave.byUser} func={onEditExpense} />}
                </div>
            </div>

        </section>
    )
}

