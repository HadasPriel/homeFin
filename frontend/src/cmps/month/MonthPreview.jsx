import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";


export const MonthPreview = ({ month }) => {
    let { accountId } = useParams();

    if (!month) return <div>Loading...</div>
    return (
        <section className="account-details">

            <Link to={`/account/${accountId}/${month._id}`} >
                <span>{month.time}</span>
            </Link>

        </section>
    )
}