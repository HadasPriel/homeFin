import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { StartRow } from "./StartRow"
import { useDndPlaceholder } from '../../hooks/useDndPlaceholder.js'


export const CategoryColHeaders = ({ color, cols, updateCols }) => {
    const [placeholderProps, setPlaceholderProps, resetPlaceholderProps] = useDndPlaceholder({})

    const onDragEnd = (res) => {
        if (!res.destination) return
        if (res.destination.index === res.source.index) return
        
        const colsToSave = [...cols]
        const draggedCol = colsToSave.splice(res.source.index, 1)[0]
        colsToSave.splice(res.destination.index, 0, draggedCol)
        updateCols(colsToSave)
        
        resetPlaceholderProps()
    }

    const onDragUpdate = (update) => {
        // if (!update.destination || !update.source) return
        setPlaceholderProps(update)
    }

    return (
        <section className="headers row-container">
            <div className="flex expense-description">
                <StartRow color={color} />
                <div className="flex center budget cell">Budget</div>
            </div>
            <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate} onDragStart={onDragUpdate}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            className="col-list"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {cols.map((col, index) => (
                                <Draggable key={col} draggableId={col} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`cell flex center ${snapshot.isDragging ? 'col-dragging' : ''}`}
                                            key={col}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {col}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {snapshot.isDraggingOver && placeholderProps.height && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 40,
                                        left: placeholderProps.leftVertical + 401 || 400,
                                        height: 36,
                                        width: 129,
                                        zIndex: 30,
                                        border: '0.5px dashed rgb(164, 171, 190)',
                                        backgroundColor: '#d5edf9'
                                    }}
                                />
                            )}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="last-cell cell flex center"></div>
        </section>
    )
}

