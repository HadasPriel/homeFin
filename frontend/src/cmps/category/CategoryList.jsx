import { CategoryPreview } from './CategoryPreview'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const CategoryList = ({ categories, updateMonth, updateCtegory, deleteCategory, addExpense, updateExpense, deleteExpense, cols, updateLabel, removeLabel }) => {

    const onDragEnd = (res) => {
        if (!res.destination) return
        if (res.destination.index === res.source.index) return


        const categoriesToSave = JSON.parse(JSON.stringify(categories))
        const dragedCategory = categoriesToSave.splice(res.source.index, 1)[0]
        categoriesToSave.splice(res.destination.index, 0, dragedCategory)
        updateMonth('categories', categoriesToSave)
    }


    const getItemStyle = (snap, x, style) => {
        console.log(snap);
        return style
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    // style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {categories.map((category, index) => (
                            <Draggable key={category.id} draggableId={category.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}

                                        style={getItemStyle(
                                            snapshot,
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
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
                                            updateLabel={updateLabel}
                                            removeLabel={removeLabel}
                                            dragHandleProps={{ ...provided.dragHandleProps }} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}

            </Droppable>
        </DragDropContext>
    )
}