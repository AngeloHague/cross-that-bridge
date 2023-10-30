import React, { useEffect, useState } from 'react'
import RoundedButton from '../RoundedButton'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TASK, SET_TASKS, TOGGLE_TASKS } from '../../util/redux/projectSlice';
import { motion, useAnimation } from 'framer-motion';
import { createTodo as createTodoMutation } from '../../graphql/mutations';
import { API, Auth } from 'aws-amplify';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { compareObjects } from '../../util/util';

export function DraggableTask({task, index, markAsComplete}) {
    const icon = (task.complete) ? 'check-circle' : 'circle';
    let classList = 'flex my-5 w-full box-border p-3 pl-4 justify-between ';
    classList += (task.complete) ? 'text-gray-400 ' : 'text-white ';
    return(
            <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => {
                    if (snapshot.isDragging) {
                        // const offset = { x: 0, y: 368 }          // your fixed container left/top position
                        // const x = provided.draggableProps.style.left - offset.x;
                        const y = provided.draggableProps.style.top - 208;
                        // provided.draggableProps.style.left = x;
                        provided.draggableProps.style.top = y;
                     }
                    return (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classList}>
                        <p className={'uppercase text-lg font-semibold text-left '}>{task.content}</p>
                        <button onClick={markAsComplete}><FeatherIcon icon={icon} /></button>
                    </li>
                )}}
            </Draggable>
    )
}

function PendingChanges({tasks, items, resetChanges}) {
    if (!compareObjects(tasks, items)) return (
        <div className='w-full absolute bottom-0 left-0 box-border'>
            <div className='soft-dark rounded-xl gap-4 m-4 px-4 py-3'>
                <h6 className='w-full uppercase text-2xl font-medium h-16 flex items-center justify-center'>Pending Changes</h6>
                <div className='flex w-full justify-around gap-4'>
                    <button onClick={resetChanges} className='rounded-xl py-2 bg-cancel-red w-1/2 text-xl font-medium uppercase'>Discard</button>
                    <button className='rounded-xl py-2 bg-green-500 w-1/2 text-xl font-medium uppercase'>Save</button>
                </div>
            </div>
        </div>
    )
}

export function TaskList({tasks}) {
    const [items, setItems] = useState(tasks);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setItems(tasks);
    }, [tasks])

    const setTaskAsComplete = (index) => {
        console.log('Updating task ', index)
        // Create a deep copy of the original array
        const status = items[index].complete;
        const tasks = items.map((item, i) =>
            i === index ? { ...item, ['complete']: !status } : item
        );
        setItems(tasks);
        console.log('Updated tasks ', tasks)
    }

    const resetChanges = () => {
        setItems(tasks);
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const updatedItems = [...items];
        const [reorderedItem] = updatedItems.splice(result.source.index, 1);
        
        if (result.type === 'ITEM') {
            updatedItems.splice(result.destination.index, 0, reorderedItem);
        }

        setItems(updatedItems);
    }

    return (
        <>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='tasks' type='ITEM'>
                {(provided) => (
                    <ul
                        className={'tasks ' + compareObjects(tasks, items) ? '' : ''}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {items ? items.map((item, index) => (
                            <DraggableTask task={item} index={index} markAsComplete={() => setTaskAsComplete(index)} />
                        )) : <></>}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
        <PendingChanges tasks={tasks} items={items} resetChanges={resetChanges} />
        </>
    )
}

export function TaskView() {
    const project = useSelector(state => state.projects.current);
    const tasks = (project && project.tasks) ? project.tasks : []
    const showTasks = useSelector(state => state.projects.showTasks);
    // sort projects
    const sorted = tasks.slice().sort((a, b) => a.order - b.order);
    console.log('Sorted tasks:', sorted)

    const variants = {
        noProject: {
            x: '100%',
        },
        hasProject: {
            x: '100%',
        },
        taskView: {
            x: 0,
        }
    }

    const controls = useAnimation();
    useEffect(() => {
        // Whenever reduxVariable changes, update the animation
        if (project === null) {
            // Set the element to be off-screen
            controls.start('noProject');
            // setTasks(null);
        } else {
            // const t = project.tasks;
            // setTasks(t);
            if (showTasks) {
                // Set the element to be on-screen
                controls.start('taskView');
            } else {
                // Set the element to be on-screen
                controls.start('hasProject');
            }
        }
    }, [project, controls, showTasks]);

    return (
        <motion.div className='w-full h-full px-8 absolute inset-y-0 overflow-auto flex flex-col'
            initial={'noProject'}
            animate={controls}
            variants={variants}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
            <TaskList tasks={sorted} />
        </motion.div>
    )
}