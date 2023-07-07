import { useEffect, useState } from "react";
import { ExpensePreview } from "../expense/ExpensePreview"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export const ExpenseList = (props) => {

    // const [expaensesToShow, setExpaensesToShow] = useState(props.category.expenses)

    const onDragEnd = (res) => {
        if (!res.destination) return

        const categoryToSave = JSON.parse(JSON.stringify(props.category))
        const dragedExpense = categoryToSave.expenses.splice(res.source.index, 1)[0]
        categoryToSave.expenses.splice(res.destination.index, 0, dragedExpense)
        // setExpaensesToShow(categoryToSave.expenses)
        props.updateCtegory(categoryToSave)
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
                        {props.category.expenses.map((expense, index) => (
                            <Draggable key={expense.id} draggableId={expense.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    // style={getItemStyle(
                                    //     snapshot.isDragging,
                                    //     provided.draggableProps.style
                                    // )}
                                    >
                                        <ExpensePreview
                                            color={props.category.color}
                                            key={expense.id}
                                            expense={expense}
                                            updateExpense={props.updateExpense}
                                            deleteExpense={props.deleteExpense}
                                            cols={props.cols}
                                            updateLabel={props.updateLabel}
                                            removeLabel={props.removeLabel} />
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



