import { ExpenseColSum } from "./ExpenseColSum";
import { ExpenseColUser } from "./ExpenseColUser";
import { ExpenseColDate } from "./ExpenseColDate";
import { ExpenseColLabel } from "./ExpenseColLabel";
import { ExpenseColRepeat } from "./ExpenseColRepeat";

export const ExpenseColList = ({ cols, expanseToSave, onEditExpense, accountMembers, editExpenseTime, editExpenseRepeat }) => {

    return (
        <div className=" flex">
            {cols.map(col => {
                switch (col) {
                    case 'repeated':
                        return <ExpenseColRepeat expanseToSave={expanseToSave} editExpenseRepeat={editExpenseRepeat} key={col} />
                    case 'sum':
                        return <ExpenseColSum expanseToSave={expanseToSave} onEditExpense={onEditExpense} key={col} />
                    case 'labels':
                        return <ExpenseColLabel key={col} />
                    case 'date':
                        return <ExpenseColDate expanseToSave={expanseToSave} editExpenseTime={editExpenseTime} key={col} />
                    case 'person':
                        return <ExpenseColUser expanseToSave={expanseToSave} accountMembers={accountMembers} onEditExpense={onEditExpense} key={col} />
                }
            })}
        </div>
    )
}

