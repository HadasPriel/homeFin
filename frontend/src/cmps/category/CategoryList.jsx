import { CategoryPreview } from './CategoryPreview'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from 'react';

export const CategoryList = ({ categories, updateMonth, updateCtegory, deleteCategory, addExpense, updateExpense, deleteExpense, cols, updateCols, updateLabel, removeLabel, income }) => {

    const [isDragging, setIsDragging] = useState(false)

    const onDragEnd = (res) => {
        setIsDragging(false)
        if (!res.destination) return
        if (res.destination.index === res.source.index) return


        const categoriesToSave = JSON.parse(JSON.stringify(categories))
        const dragedCategory = categoriesToSave.splice(res.source.index, 1)[0]
        categoriesToSave.splice(res.destination.index, 0, dragedCategory)
        updateMonth('categories', categoriesToSave)
    }

    const onDragStart = () => {
        setIsDragging(true)
    }



    return (
        <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onDragStart}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {categories.map((category, index) => (
                            <Draggable key={category.id} draggableId={category.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <CategoryPreview
                                            key={category.id}
                                            category={category}
                                            updateCtegory={updateCtegory}
                                            deleteCategory={deleteCategory}
                                            addExpense={addExpense}
                                            updateExpense={updateExpense}
                                            deleteExpense={deleteExpense}
                                            cols={cols}
                                            updateCols={updateCols}
                                            updateLabel={updateLabel}
                                            removeLabel={removeLabel}
                                            dragHandleProps={{ ...provided.dragHandleProps }}
                                            isDragging={isDragging} />


                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        <CategoryPreview category={income}
                            updateCtegory={updateCtegory}
                            deleteCategory={deleteCategory}
                            addExpense={addExpense}
                            updateExpense={updateExpense}
                            deleteExpense={deleteExpense}
                            cols={cols}
                            updateCols={updateCols}
                            updateLabel={updateLabel}
                            removeLabel={removeLabel}

                        />
                    </ul>
                )}

            </Droppable>
        </DragDropContext>
    )
}