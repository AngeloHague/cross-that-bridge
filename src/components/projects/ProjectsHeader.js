import React, { useEffect } from 'react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import { useOverlay } from '../OverlayContext';
import AddProject from './AddProject';
import Heading from '../Heading';
import { useSelector } from 'react-redux';
import { AnimatedButton, AnimatedDiv } from '../MotionComponents';
import { useDispatch } from 'react-redux';
import { CLEAR_CURRENT_PROJECT, TOGGLE_TASKS } from '../../util/redux/projectSlice';
import AddTask from './AddTask';

const flex_center = "flex justify-center items-center ";



export default function ProjectsHeader({props}) {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.projects);
    const project = useSelector(state => state.projects.current);
    const showTasks = useSelector(state => state.projects.showTasks);
    const n_projects = (projects) ? projects.length : 0;
    const n_tasks = (project && project.tasks) ? project.tasks.length : 0;

    const n = (project) ? n_tasks : n_projects;
    
    const title = (project) ? 'Tasks' : 'Projects';
    const rightBtnIcon = (project) ? 'arrow-left' : 'search'
    const rightBtnFn = () => {
        if (project) {
            // go back
            if (showTasks) {
                // toggle show tasks
                dispatch(TOGGLE_TASKS());
            } else {
                // clear project
                dispatch(CLEAR_CURRENT_PROJECT());
            }
        } else {
            // search
        }
    }
    const leftBtnFn = () => {
        if (project) {
            // go back
            openOverlay(<AddTask />)
        } else {
            openOverlay(<AddProject />)
        }
    }

    const { openOverlay } = useOverlay();
    const addProject = () => {
        openOverlay(<AddProject />)
    }
    return (
        <div className="App-Header flex p-5 gap-5 justify-center max-w-sm m-auto">
            <AnimatedDiv className={"Project-Count shrink-0 soft-white rounded-xl w-32 h-32 aspect-square "+flex_center}>
                <p className="text-9xl">{n}</p>
            </AnimatedDiv>
            <div className="Header-buttons flex flex-wrap shrink-1 justify-evenly items-end">
                <Heading>{title}</Heading>
                <AnimatedButton delay={0.6} className={"soft-white rounded-lg w-16 h-16 "+flex_center}><FeatherIcon icon="plus" width="30" height="30" onClick={leftBtnFn} /></AnimatedButton>
                <AnimatedButton delay={0.9} onClick={rightBtnFn} className={"soft-white rounded-lg w-16 h-16 " + flex_center}><FeatherIcon icon={rightBtnIcon} /></AnimatedButton>
            </div>
        </div>
    )
}
