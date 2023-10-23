import React from 'react'
import RoundedButton from '../RoundedButton'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_PROJECT } from '../../util/redux/projectSlice';

export default function ProjectsList() {
    const projects = useSelector(state => state.projects.projects);
    const dispatch = useDispatch();
    // sort projects
    const sorted = projects.slice().sort((a,b) => a.updatedAt - b.updatedAt);
    
    function setProject(id) {
        console.log('Setting project to: '+id)
        dispatch(SET_CURRENT_PROJECT(id));
    }

    return (
        <div className="w-full box-border px-8 h-full">
            {projects ? sorted.map((project, index) => (
                <RoundedButton delay={index*0.3} key={project.id} text={project.name} onClick={() => setProject(project.id)} />
            )) : <></>}
        </div>
    )
}
