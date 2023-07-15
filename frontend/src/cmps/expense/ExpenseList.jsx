import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ExpensePreview } from "../expense/ExpensePreview"

export const ExpenseList = (props) => {
    const [placeholderProps, setPlaceholderProps] = useState({})

    const onDragEnd = (result) => {
        if (!result.destination) return
        if (result.destination.index === result.source.index) return

        const categoryToSave = JSON.parse(JSON.stringify(props.category))
        const draggedExpense = categoryToSave.expenses.splice(result.source.index, 1)[0]
        categoryToSave.expenses.splice(result.destination.index, 0, draggedExpense)
        props.updateCtegory(categoryToSave)

        setPlaceholderProps({})
    }

    const onDragUpdate = (update) => {
        if (!update.destination) return
        const draggableId = update.draggableId
        const destinationIndex = update.destination.index

        const domQuery = `[data-rbd-drag-handle-draggable-id='${draggableId}']`
        const draggedDOM = document.querySelector(domQuery)

        if (!draggedDOM) return
        const { clientHeight, clientWidth } = draggedDOM

        const clientY =
            parseFloat(
                window.getComputedStyle(draggedDOM.parentNode).paddingTop
            ) +
            [...draggedDOM.parentNode.children]
                .slice(0, destinationIndex)
                .reduce((total, curr) => {
                    const style = curr.currentStyle || window.getComputedStyle(curr)
                    const marginBottom = parseFloat(style.marginBottom)
                    return total + curr.clientHeight + marginBottom
                }, 0)

        setPlaceholderProps({
            clientHeight,
            clientWidth,
            clientY,
            clientX: parseFloat(
                window.getComputedStyle(draggedDOM.parentNode).paddingLeft
            ),
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
            <Droppable droppableId="droppable">
                {(providedDrop, snapshotDrop) => (
                    <ul {...providedDrop.droppableProps} ref={providedDrop.innerRef}>
                        {props.category.expenses.map((expense, index) => (
                            <Draggable
                                key={expense.id}
                                draggableId={expense.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`${snapshot.isDragging && 'dragging'}`}
                                    >
                                        <ExpensePreview
                                            color={props.category.color}
                                            key={expense.id}
                                            expense={expense}
                                            updateExpense={props.updateExpense}
                                            deleteExpense={props.deleteExpense}
                                            cols={props.cols}
                                            updateLabel={props.updateLabel}
                                            removeLabel={props.removeLabel}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {providedDrop.placeholder}
                        {snapshotDrop.isDraggingOver && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: placeholderProps.clientY + 76,
                                    left: placeholderProps.clientX + 6,
                                    height: placeholderProps.clientHeight,
                                    width: placeholderProps.clientWidth,
                                    zIndex: 25,
                                    border: '0.5px dashed rgb(164, 171, 190)'
                                }}
                            />
                        )}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}