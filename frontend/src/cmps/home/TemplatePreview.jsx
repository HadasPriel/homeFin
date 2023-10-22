import { useState } from "react";
export const TemplatePreview = ({template}) => {

    const [IsHover, setIsHover] = useState(false)


    return (
        
        <li 
            className='template-preview flex col center'
            style={{ borderColor: (IsHover) ? template.color: 'rgba(255,255,255,0.3)' }} 
            onMouseEnter={() => {setIsHover(true)}}
            onMouseLeave={() => {setIsHover(false)}}
        >
            {/* <img src={template.img} /> */}
            {template.title}
        </li>
           
    )
}


