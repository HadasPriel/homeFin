import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ExpensePreview } from "../expense/ExpensePreview"
import { useDndPlaceholder } from '../../hooks/useDndPlaceholder.js'

export const ExpenseList = (props) => {
    const [placeholderProps, setPlaceholderProps, resetPlaceholderProps] = useDndPlaceholder({})

    const onDragEnd = (result) => {
        if (!result.destination) return
        if (result.destination.index === result.source.index) return

        const categoryToSave = JSON.parse(JSON.stringify(props.category))
        const draggedExpense = categoryToSave.expenses.splice(result.source.index, 1)[0]
        categoryToSave.expenses.splice(result.destination.index, 0, draggedExpense)
        props.updateCtegory(categoryToSave)

        resetPlaceholderProps()    
    }

    const onDragUpdate = (update) => {
        if (!update.destination) return
        setPlaceholderProps(update)
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
                                    top: placeholderProps.top + 76 || 0,
                                    left: placeholderProps.left + 6 || 0,
                                    height: placeholderProps.height || 0,
                                    width: placeholderProps.width || 0,
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
