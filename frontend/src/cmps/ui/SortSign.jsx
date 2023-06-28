import { ReactComponent as Img } from '../../assets/img/sortSign.svg'

export const SortSign = ({ color }) => {


    return (
        <Img fill={color} transform="rotate(180)" width="20px" />
    )
}
