import { Link } from 'react-router-dom'

export const TemplateList = () => {

    const templates = [
        {
            id: '1',
            title: 'Students budget',
            img: '',
            color: '',
            url: 'http://localhost:3000/#/account/651a6cc8bfc7a6494cf1cb0a/651a6cd3bfc7a6494cf1cb0c'
        },
        {
            id: '2',
            title: 'Freelancer\'s budget',
            img: '',
            color: '',
            url: ''
        },
        {
            id: '3',
            title: 'Small Business budget',
            img: '',
            color: '',
            url: ''
        },
        {
            id: '4',
            title: 'Fitness and Health budget',
            img: '',
            color: '',
            url: ''
        },
        {
            id: '5',
            title: 'Travel budget',
            img: '',
            color: '',
            url: ''
        },
    ]

    return (
        <ul className="template-list" >
            {templates.map((template) =>
                <Link to={template.url} key={template.id} >
                    <li className={`template-preview ${template.url ? '' : 'cursor-disable'}`} >
                        {template.title}
                        <img src={template.img} />
                    </li>
                </Link>
            )}
        </ul>
    )
}


