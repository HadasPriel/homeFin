import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from 'react-redux'


export const ExpenseDetails = () => {

    let { accountId, monthId, expenseId } = useParams()
    const [expense, setExpense] = useState(null)
    const month = useSelector(state => state.monthModule.currMonth)


    // useEffect(() => {
    //     month.categories?.forEach(()=>{
    //         categ.expenses.find((expense)=>{
    //             if(expense.id === expenseId)
    //         })
    //     })
    // }, [month])

    return (
        <section className="expense-details">
            <h1>HHIII!</h1>
        </section>
    )
}


