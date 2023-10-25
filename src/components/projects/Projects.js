import React, { useEffect } from 'react'
import RoundedButton from '../RoundedButton'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_PROJECT } from '../../util/redux/projectSlice';
import { motion, useAnimation } from 'framer-motion';

export function ProjectsList() {
    const project = useSelector(state => state.projects.current);
    const projects = useSelector(state => state.projects.projects);
    const dispatch = useDispatch();
    // sort projects
    const sorted = projects.slice().sort((a, b) => a.updatedAt - b.updatedAt);

    function setProject(p) {
        console.log('Setting project to: ' + p)
        dispatch(SET_CURRENT_PROJECT(p));
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
                <RoundedButton delay={index * 0.3} key={project.id} text={project.name} onClick={() => setProject(project)} />
            )) : <></>}
        </motion.div>
    )
}
