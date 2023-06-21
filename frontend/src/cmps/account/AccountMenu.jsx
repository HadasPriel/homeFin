import { useToggle } from "../../hooks/useToggle"

export const AccountMenu = () => {

    const [isMenuOpen, setIsMenuOpen] = useToggle(false)



    return (
        <section className={`account-menu ${isMenuOpen}`} >
            <button className="collapse-btn" onClick={setIsMenuOpen} ></button>


        </section>
    )
}