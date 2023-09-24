
import { UserList } from "../ui/UserList"
import { UserImg } from "../ui/UserImg"
import { useToggle } from "../../hooks/useToggle.js"

export const ExpenseColUser = ({ expenseToSave, accountMembers, onEditExpense }) => {
    const [isByUserShow, setIsByUserShow] = useToggle(false)

    return (
        <div className="expense-cell-user cell flex center" onClick={setIsByUserShow} >
            <UserImg user={expenseToSave.byUser} />
            {isByUserShow && <UserList
                members={accountMembers}
                expenseMember={expenseToSave.byUser}
                func={onEditExpense}
                setIsListShow={setIsByUserShow} />}
        </div>
    )
}

