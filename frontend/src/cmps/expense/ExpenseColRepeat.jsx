
export const ExpenseColRepeat = ({ expenseToSave, editExpenseRepeat }) => {

    return (
        <div
            className={`repeated cell flex center ` + ((expenseToSave.repeat) ? 'confirme' : 'decline')}
            onClick={editExpenseRepeat} >

        </div>
    )
}

