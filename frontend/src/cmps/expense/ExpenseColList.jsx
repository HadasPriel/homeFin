import { ExpenseColSum } from "./ExpenseColSum";
import { ExpenseColUser } from "./ExpenseColUser";
import { ExpenseColDate } from "./ExpenseColDate";
import { ExpenseColLabel } from "./ExpenseColLabel";
import { ExpenseColRepeat } from "./ExpenseColRepeat";

export const ExpenseColList = ({ cols, expanseToSave, onEditExpense, account, editExpenseTime, editExpenseRepeat }) => {

    return (
        <div className=" flex">
            {cols.map(col => {
                switch (col) {
                    case 'repeated':
                        return <ExpenseColRepeat expanseToSave={expanseToSave} editExpenseRepeat={editExpenseRepeat} key={col} />
                    case 'sum':
                        return <ExpenseColSum expanseToSave={expanseToSave} onEditExpense={onEditExpense} key={col} />
                    case 'labels':
                        return <ExpenseColLabel key={col} expanseToSave={expanseToSave} accountLabels={account.labels} onEditExpense={onEditExpense} />
                    case 'date':
                        return <ExpenseColDate expanseToSave={expanseToSave} editExpenseTime={editExpenseTime} key={col} />
                    case 'person':
                        return <ExpenseColUser expanseToSave={expanseToSave} accountMembers={account.members} onEditExpense={onEditExpense} key={col} />
                    default:
                        return <div></div>
                }
            })}
        </div>
    )
}

