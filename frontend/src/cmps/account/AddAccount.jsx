import { useState } from "react";


export const AddAccount = ({ addAccount }) => {
    const [accountToAdd, setAccountToAdd] = useState({ title: '' });
    // const elTitle = useRef(null)

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setAccountToAdd(prevState => { return { ...prevState, [name]: value } })
    }

    const onAddAccount = (ev) => {
        ev.preventDefault()
        addAccount(accountToAdd)
        setAccountToAdd({ title: '' })
    }

    return (
        <form onSubmit={onAddAccount}>
            <input
                // ref={elTitle} 
                type="text"
                name="title"
                value={accountToAdd.title}
                onChange={handleChange}
            />
        </form>
    )
}