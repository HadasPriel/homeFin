import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector } from 'react-redux'

import { ExpenseDetailsHeader } from "../cmps/expense/ExpenseDetailsHeader"


export const ExpenseDetails = () => {

    let { expenseId } = useParams()
    const [expense, setExpense] = useState(null)
    const [tab, setTab] = useState('updates')
    const month = useSelector(state => state.monthModule.currMonth)

    useEffect(() => {
        var currExpanse = null
        month.categories?.forEach((categ) => {
            if (currExpanse) return
            currExpanse = (categ.expenses.find((expense) => {
                return expense.id === expenseId
            }))
            if (currExpanse) setExpense(currExpanse)
        })
    }, [month, expenseId])


    if (!expense) return <div>Loading...</div>
    return (
        <section className="expense-details">
            <ExpenseDetailsHeader
                setTab={setTab}
                description={expense.description}
                byUser={expense.byUser}
                currTab={tab} />
            <main>
                {tab}
            </main>
        </section>
    )
}


