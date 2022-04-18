import { ExpenseLabelPreview } from "./ExpenseLabelPreview"


export const ExpenseLabelEdit = ({ accountLabels, onEditExpense, setIsEditShow }) => {



    return (
        <section className="expense-label-edit">
            <div className="label-list">
                {accountLabels.map(label =>
                    <ExpenseLabelPreview label={label} onEditExpense={onEditExpense} setIsEditShow={setIsEditShow} key={label.id} />
                )}
            </div>
        </section>
    )
}

