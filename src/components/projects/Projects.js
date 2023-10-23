import React, { useEffect } from 'react'
import RoundedButton from '../RoundedButton'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_CURRENT_PROJECT, DELETE_PROJECT, SET_CURRENT_PROJECT } from '../../util/redux/projectSlice';
import { motion, useAnimation } from 'framer-motion';
import { deleteProject as deleteProjectMutation } from '../../graphql/mutations';
import { API } from 'aws-amplify';
import ConfirmDeletionModal from './ConfirmDeletionModal';
import { useOverlay } from '../OverlayContext';

export function Project({props}) {
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.current);
    const projects = useSelector(state => state.projects.projects);
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
            x: 0,
        }
    }
    const controls = useAnimation();
    useEffect(() => {
        // Whenever reduxVariable changes, update the animation
        if (project === null) {
          // Set the element to be off-screen
          controls.start('noProject');
        } else {
          // Set the element to be on-screen
          controls.start('hasProject');
        }
      }, [project, controls]);

      function goBack() {
        dispatch(CLEAR_CURRENT_PROJECT());
        console.log(project)
      }
        const confirmDelete = () => {
            openOverlay(<ConfirmDeletionModal confirmFn={deleteProject} />)
        }
      async function deleteProject() {
            const id = project;
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
                console.log('Failed to delete project: '+id+". Error:")
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
            <RoundedButton text="Start Building"/>
            <RoundedButton text="Edit Tasks" icon='edit'/>
            <RoundedButton text="Burn Bridges" onClick={confirmDelete} icon='trash'/>
            <RoundedButton text="Go Back" onClick={goBack} icon={'arrow-left'}/>
        </motion.div>
    )
}

export function ProjectsList() {
    const project = useSelector(state => state.projects.current);
    const projects = useSelector(state => state.projects.projects);
    const dispatch = useDispatch();
    // sort projects
    const sorted = projects.slice().sort((a,b) => a.updatedAt - b.updatedAt);
    
    function setProject(id) {
        console.log('Setting project to: '+id)
        dispatch(SET_CURRENT_PROJECT(id));
    }
    const variants = {
        offScreen: {
            x: '-100%',
        },
        onScreen: {
            x: 0,
        }
    }
    const controls = useAnimation();
    useEffect(() => {
        // Whenever reduxVariable changes, update the animation
        if (project === null) {
          // Set the element to be off-screen
          controls.start('onScreen');
        } else {
          // Set the element to be on-screen
          controls.start('offScreen');
        }
      }, [project, controls]);

    return (
        <motion.div className="w-full box-border px-8 h-full absolute inset-0 overflow-auto"
            initial={'onScreen'}
            animate={controls}
            variants={variants}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
            {projects ? sorted.map((project, index) => (
                <RoundedButton delay={index*0.3} key={project.id} text={project.name} onClick={() => setProject(project.id)} />
            )) : <></>}
        </motion.div>
    )
}
