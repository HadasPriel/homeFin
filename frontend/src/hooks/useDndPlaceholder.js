import { useState } from "react"

export const useDndPlaceholder = (initialProps = {}) => {
    const [placeholderProps, setPlaceholderProps] = useState(initialProps)

    const updatePlaceholderProps = (update) => {
        const destinationIdx = update.destination?.index || update.source?.index
        const elDragged = document.querySelector(
            `[data-rbd-drag-handle-draggable-id='${update.draggableId}']`
        )

        if (!elDragged) return
        const { clientHeight, clientWidth } = elDragged

        const paddindTop = parseFloat(
            window.getComputedStyle(elDragged.parentNode).paddingTop
        )

        let top = paddindTop
        let leftVertical = paddindTop


        const elChildrens = [...elDragged.parentNode.children].slice(0, destinationIdx)
        elChildrens.forEach((el) => {
            const style = el.currentStyle || window.getComputedStyle(el)
            const borderLeft = parseFloat(style.borderLeftWidth)
            const borderRight = parseFloat(style.borderRightWidth)
            const marginBottom = parseFloat(style.marginBottom)
            top += el.clientHeight + marginBottom
            leftVertical += el.clientWidth + borderLeft + borderRight
        })

        setPlaceholderProps({
            height: clientHeight,
            width: clientWidth,
            top,
            left: parseFloat(
                window.getComputedStyle(elDragged.parentNode).paddingLeft
            ),
            leftVertical
        })
    }

    const resetPlaceholderProps = () => {setPlaceholderProps({})}

    return [placeholderProps, updatePlaceholderProps, resetPlaceholderProps]
}