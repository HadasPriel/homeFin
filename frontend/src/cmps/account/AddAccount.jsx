import { useState } from "react";


export const AddAccount = ({ addAccount }) => {
    const [isAddShow, setIsAddShow] = useState(false);
    const [accountToAdd, setAccountToAdd] = useState({ title: '' });
    // const elTitle = useRef(null)

    const toggleAdd = () => {
        setIsAddShow(prevState => !prevState)
    }

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setAccountToAdd(prevState => { return { ...prevState, [name]: value } })
    }

    const onAddAccount = (ev) => {
        ev.preventDefault()
        addAccount(accountToAdd)
        toggleAdd()
        setAccountToAdd({ title: '' })
    }

    return (
        <section className="add-account">
            <div className='add-account-container flex space-between'>
                {isAddShow &&
                    <form onSubmit={onAddAccount} >
                        <label>
                            Acoount name:
                            <input
                                // ref={elTitle} 
                                type="text"
                                name="title"
                                value={accountToAdd.title}
                                onChange={handleChange}
                            />
                        </label>
                        <button className="btn suc" >Save</button>
                    </form>}
                {!isAddShow && <h2 onClick={toggleAdd} className="account-title plus inherit">Add board</h2>}
            </div>

        </section>
    )
}