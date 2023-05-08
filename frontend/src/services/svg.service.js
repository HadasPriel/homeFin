import { sortSign } from '../assets/img/icon/sortSign.svg'

export const svgService = {
    getSvg
}

const svgMap = {
    sortSign
}

function getSvg(icon) {
    return svgMap[icon]
}