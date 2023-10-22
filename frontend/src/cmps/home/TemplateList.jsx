import { Link } from 'react-router-dom'
import { dataService } from '@/services/data.service.js'
import { TemplatePreview } from './TemplatePreview'

export const TemplateList = () => {

    const templates = dataService.getAccountTemplates()

    return (
        <ul className="template-list flex center" >
            {templates.map((template) =>
                <Link 
                to={`/account/${template._id}`} key={template._id} >
                    <TemplatePreview template={template} />
                </Link>
            )}
        </ul>
    )
}


