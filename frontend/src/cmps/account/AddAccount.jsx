
import { useToggle } from "../../hooks/useToggle";
import { useForm } from "../../hooks/useForm.js";


export const AddAccount = ({ addAccount }) => {

    const [isAddShow, setIsAddShow] = useToggle(false);
    const [accountToAdd, setAccountToAdd] = useForm({ title: '' });


    const onAddAccount = (ev) => {
        ev.preventDefault()
        addAccount(accountToAdd)
        setIsAddShow()
        setAccountToAdd({ title: '' })
    }

    return (
        <section className="add-account" >
            <div className='add-account-container flex space-between'>
                {isAddShow &&
                    <form onSubmit={onAddAccount} >
                        <label>
                            Acoount name:
                            <input
                                type="text"
                                name="title"
                                value={accountToAdd.title}
                                onChange={setAccountToAdd}
                            />
                        </label>
                        <button className="btn suc" >Save</button>
                    </form>}
                {!isAddShow && <h2 onClick={setIsAddShow} className="account-title plus inherit">Add board</h2>}
            </div>

        </section>
    )
}