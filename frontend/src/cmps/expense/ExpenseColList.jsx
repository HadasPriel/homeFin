import { ExpenseColSum } from "./ExpenseColSum";
import { ExpenseColUser } from "./ExpenseColUser";
import { ExpenseColDate } from "./ExpenseColDate";
import { ExpenseColLabel } from "./ExpenseColLabel";
import { ExpenseColRepeat } from "./ExpenseColRepeat";
import { ExpenseColExpected } from "./ExpenseColExpected";

export const ExpenseColList = ({ cols, expenseToSave, onEditExpense, account, editExpenseTime, editExpenseRepeat, updateLabel, removeLabel, currency, categoryColor, categoryExpected }) => {


    return (
        <section className="col-list">
            {cols.map(col => {
                switch (col) {
                    case 'repeated':
                        return <ExpenseColRepeat expenseToSave={expenseToSave} editExpenseRepeat={editExpenseRepeat} key={col} />
                    case 'sum':
                        return <ExpenseColSum expenseToSave={expenseToSave} onEditExpense={onEditExpense} key={col} currency={currency} />
                    case 'labels':
                        return <ExpenseColLabel expenseToSave={expenseToSave} accountLabels={account.labels} onEditExpense={onEditExpense} updateLabel={updateLabel} removeLabel={removeLabel} key={col} />
                    case 'date':
                        return <ExpenseColDate expenseToSave={expenseToSave} editExpenseTime={editExpenseTime} key={col} />
                    case 'person':
                        return <ExpenseColUser expenseToSave={expenseToSave} accountMembers={account.members} onEditExpense={onEditExpense} key={col} />
                    case 'expected':
                        return <ExpenseColExpected expected={categoryExpected} color={categoryColor} expensesSum={expenseToSave.sum.amount} currency={currency} key={col} />
                    default:
                        return <div></div>
                }
            })}
        </section>
    )
}

