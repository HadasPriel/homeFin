import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { CategoryPreview } from './CategoryPreview'

export const CategoryList = ({ categories, updateMonth, updateCategory, deleteCategory, addExpense, updateExpense, deleteExpense, cols, updateLabel, removeLabel }) => {

    // const [isDragging, setIsDragging] = useState(false)
    const [placeholderProps, setPlaceholderProps] = useState({})

    const onDragEnd = (result) => {
        // setIsDragging(false)
        if (!result.destination) return
        if (result.destination.index === result.source.index) return

        const categoriesToSave = [...categories]
        const draggedCategory = categoriesToSave.splice(result.source.index, 1)[0]
        categoriesToSave.splice(result.destination.index, 0, draggedCategory)
        updateMonth('categories', categoriesToSave)
    }

    const onDragStart = () => {
        // setIsDragging(true)
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
            parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
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
            clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft),
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onDragStart} onDragUpdate={onDragUpdate}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {categories.map((category, index) => (
                            <Draggable key={category.id} draggableId={category.id} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <CategoryPreview
                                            key={category.id}
                                            category={category}
                                            updateCategory={updateCategory}
                                            deleteCategory={deleteCategory}
                                            addExpense={addExpense}
                                            updateExpense={updateExpense}
                                            deleteExpense={deleteExpense}
                                            cols={cols}
                                            updateLabel={updateLabel}
                                            removeLabel={removeLabel}
                                            dragHandleProps={provided.dragHandleProps}
                                        // isDragging={isDragging}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        {snapshot.isDraggingOver && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: placeholderProps.clientY,
                                    left: placeholderProps.clientX + 40,
                                    height: placeholderProps.clientHeight, //60
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