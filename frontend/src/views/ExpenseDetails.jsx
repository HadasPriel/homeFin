import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from 'react-redux'

import { ExpenseDetailsHeader } from "../cmps/expense/expenseDetails/ExpenseDetailsHeader"
import { ExpenseComment } from "../cmps/expense/expenseDetails/ExpenseComment"
import actions from "../store/actions"
import { Construction } from "../cmps/ui/Construction"


export const ExpenseDetails = () => {

    let { monthId, cotegoryId, expenseId } = useParams()
    const [expense, setExpense] = useState(null)
    const [tab, setTab] = useState('comments')
    const month = useSelector(state => state.monthModule.currMonth)

    const dispatch = useDispatch()

    useEffect(() => {
        var currExpanse = null
        month.categories?.forEach((categ) => {
            if (currExpanse) return
            currExpanse = (categ.expenses.find((expense) => {
                return expense.id === expenseId
            }))
            if (currExpanse) {
                setExpense(currExpanse)
            }
        })
    }, [month, expenseId])

    const addComment = (comment) => {
        dispatch(actions.monthActions.addComment(month._id, cotegoryId, expenseId, comment))
    }

    const deleteExpense = async (categoryId, expenseId) => {
        try {
            dispatch(actions.monthActions.removeExpense(monthId, categoryId, expenseId))
        } catch (err) {
            console.log(err)
        }
    }

    const updateExpense = async (descriptionToSave) => {
        try {
            const expenseToSave = JSON.parse(JSON.stringify(expense))
            expenseToSave.description = descriptionToSave
            dispatch(actions.monthActions.updateExpense(monthId, cotegoryId, expenseToSave))
        } catch (err) {
            console.log(err)
        }
        // eslint-disable-next-line
    }



    if (!expense) return <div>Loading...</div>
    return (
        <section className="expense-details">
            <ExpenseDetailsHeader
                setTab={setTab}
                description={expense.description}
                byUser={expense.byUser}
                currTab={tab}
                deleteExpense={deleteExpense}
                updateExpense={updateExpense} />

            <main className="expense-details-main">
                {(tab === 'comments') &&
                    <ExpenseComment
                        expense={expense}
                        addComment={addComment} />}
                {(tab === 'files') && <Construction />}
                {(tab === 'activityLog') && <Construction />}
            </main>
        </section>
    )
}


