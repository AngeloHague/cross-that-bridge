import React, { useEffect, useState } from 'react'
import RoundedButton from '../RoundedButton'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TASK, TOGGLE_TASKS } from '../../util/redux/projectSlice';
import { motion, useAnimation } from 'framer-motion';
import { createTodo as createTodoMutation } from '../../graphql/mutations';
import { API, Auth } from 'aws-amplify';

export function TaskList({tasks}) {
    return (
        <div>
        {tasks ? tasks.map((task) => (
            <button className='soft-white rounded-2xl flex my-5 w-full box-border p-3 pl-4 justify-between'>
                <p className='uppercase text-xl font-semibold'>{task.content}</p>
                {/* <FeatherIcon icon={icon} /> */}
            </button>
        )) : <></>}
        </div>
    )
}

export function TaskView({ props }) {
    const [tasks, setTasks] = useState(null);
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.current);
    const showTasks = useSelector(state => state.projects.showTasks);
    // const projects = useSelector(state => state.projects.projects);
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

    async function addTask() {
        const content = "test";
        const order = (tasks) ? tasks.length : 0;
        const userInfo = await Auth.currentUserInfo();
        const projectId = project.id;
        const params = {
            input: {
                content: content,
                order: order, projectId: projectId,
                userId: userInfo.attributes.sub, }
        }
        try {
            const res = await API.graphql({
              query: createTodoMutation,
              variables: params,
            });
            console.log(res);
            dispatch(ADD_TASK(res.data.createTodo));
            // dispatch(ADD_PROJECT(res.data.createProject));
            // closeOverlay();
            // fetchProjectsFromAWS(dispatch)
          } catch (error) {
            console.error('Error creating Task: ', error);
          }
    }

    const controls = useAnimation();
    useEffect(() => {
        // Whenever reduxVariable changes, update the animation
        if (project === null) {
            // Set the element to be off-screen
            controls.start('noProject');
            setTasks(null);
        } else {
            const t = project.tasks;
            setTasks(t);
            if (showTasks) {
                // Set the element to be on-screen
                controls.start('taskView');
            } else {
                // Set the element to be on-screen
                controls.start('hasProject');
            }
        }
    }, [project, controls, showTasks]);

    function goBack() {
        dispatch(TOGGLE_TASKS());
        console.log(project)
    }

    return (
        <motion.div className='w-full h-full px-8 absolute inset-y-0 overflow-auto'
            initial={'noProject'}
            animate={controls}
            variants={variants}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
            <TaskList tasks={tasks} />
            <RoundedButton text="Add Task" icon='plus' onClick={addTask} />
            <RoundedButton text="Go Back" onClick={goBack} icon={'arrow-left'} />
        </motion.div>
    )
}