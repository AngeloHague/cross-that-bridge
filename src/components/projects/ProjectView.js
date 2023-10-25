import React, { useEffect, useState } from 'react'
import RoundedButton from '../RoundedButton'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_CURRENT_PROJECT, DELETE_PROJECT, TOGGLE_TASKS } from '../../util/redux/projectSlice';
import { motion, useAnimation } from 'framer-motion';
import { deleteProject as deleteProjectMutation } from '../../graphql/mutations';
import { API } from 'aws-amplify';
import ConfirmDeletionModal from './ConfirmDeletionModal';
import { useOverlay } from '../OverlayContext';
import { fetchTasksByProjectFromAWS, fetchTasksFromAWS } from '../../util/aws-amplify';

export function ProjectView({ props }) {
    const [tasks, setTasks] = useState(null);
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.current);
    const showTasks = useSelector(state => state.projects.showTasks);
    // const projects = useSelector(state => state.projects.projects);
    const { openOverlay, closeOverlay } = useOverlay();
    console.log(project)
    const variants = {
        noProject: {
            x: '100%',
        },
        hasProject: {
            x: 0,
        },
        taskView: {
            x: '-100%',
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
            // fetchTasksFromAWS(dispatch);
            const id = project.id;
            console.log(id);
            if (!project.tasks) fetchTasksByProjectFromAWS(dispatch, id);
            if (showTasks) {
                // Set the element to be on-screen
                controls.start('taskView');
            } else {
                // Set the element to be on-screen
                controls.start('hasProject');
            }
        }
    }, [project, controls, showTasks]);

    function toggleTaskView() {
        dispatch(TOGGLE_TASKS());
    }
    function goBack() {
        dispatch(CLEAR_CURRENT_PROJECT());
        console.log(project)
    }
    const confirmDelete = () => {
        openOverlay(<ConfirmDeletionModal confirmFn={deleteProject} />)
    }
    async function deleteProject() {
        const id = project.id;
        // const newProjects = projects.filter((note) => note.id !== id);
        try {
            await API.graphql({
                query: deleteProjectMutation,
                variables: { input: { id } },
            });
            dispatch(DELETE_PROJECT(id));
            closeOverlay();
            goBack();
        } catch (error) {
            console.log('Failed to delete project: ' + id + ". Error:")
            console.log(error)
        }
    }

    return (
        <motion.div className='w-full h-full px-8 absolute inset-y-0 overflow-auto'
            initial={'noProject'}
            animate={controls}
            variants={variants}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
            <RoundedButton text="Start Building" />
            <RoundedButton text="Edit Tasks" icon='edit' onClick={toggleTaskView} />
            <RoundedButton text="Burn Bridges" onClick={confirmDelete} icon='trash' />
            <RoundedButton text="Go Back" onClick={goBack} icon={'arrow-left'} />
        </motion.div>
    )
}