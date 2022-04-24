import { useRef } from "react";

import { UserList } from "../ui/UserList";
import { UserImg } from "../ui/UserImg";
import { useToggle } from "../../hooks/useToggle"

export const ExpenseColUser = ({ expanseToSave, accountMembers, onEditExpense }) => {
    const elCmp = useRef();
    const [isByUserShow, setIsByUserShow] = useToggle(false, elCmp)

    return (
        <div className="cell flex center" onClick={setIsByUserShow} ref={elCmp}>
            <UserImg user={expanseToSave.byUser} />
            {isByUserShow && <UserList members={accountMembers} expenseMember={expanseToSave.byUser} func={onEditExpense} />}
        </div>
    )
}

