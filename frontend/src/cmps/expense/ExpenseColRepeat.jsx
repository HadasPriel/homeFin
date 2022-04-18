
export const ExpenseColRepeat = ({ expanseToSave, editExpenseRepeat }) => {

    return (
        <div
            className={`repeated cell flex center ` + ((expanseToSave.repeat) ? 'confirme' : 'decline')}
            onClick={editExpenseRepeat} >

        </div>
    )
}

