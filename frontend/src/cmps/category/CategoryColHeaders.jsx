import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { StartRow } from "./StartRow"


export const CategoryColHeaders = ({ color, cols, updateCols }) => {

    const onDragEnd = (res) => {
        if (!res.destination) return
        if (res.destination.index === res.source.index) return

        const colsToSave = [...cols]
        const draggedCol = colsToSave.splice(res.source.index, 1)[0]
        colsToSave.splice(res.destination.index, 0, draggedCol)
        updateCols(colsToSave)

        // setPlaceholderProps({})
    }

    return (
        <section className="headers row-container">
            <div className="flex expense-description">
                <StartRow color={color} />
                <div className="flex center budget cell">Budget</div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            className="col-list"
                            ref={provided.innerRef}
                            //   style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {cols.map((col, index) => (
                                <Draggable key={col} draggableId={col} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className="cell flex center"
                                            key={col}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        //   style={getItemStyle(
                                        //     snapshot.isDragging,
                                        //     provided.draggableProps.style
                                        //   )}
                                        >
                                            {col}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="last-cell cell flex center"></div>
        </section>
    )
}







    // return (
    //     <section className="headers row-container">
    //         <div className="flex expense-description">
    //             <StartRow color={color} />
    //             <div className="flex center budget cell">Budget</div>
    //         </div>
    //         <div className="col-list">
    //             {cols.map(col => <div className="cell flex center" key={col} >{col}</div>)}
    //         </div>
    //         <div className="last-cell cell flex center"></div>
    //     </section>
    // )

