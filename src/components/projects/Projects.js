import React from 'react'
import RoundedButton from '../RoundedButton'
import { useDispatch, useSelector } from 'react-redux'

export default function ProjectsList({ setProject }) {
    const projects = useSelector(state => state.projects.projects);
    const dispatch = useDispatch();

    return (
        <div className="w-full box-border px-8">
            {projects ? projects.map((project) => (
                <RoundedButton key={project.id} text={project.name} onClick={() => setProject(project)} />
            )) : <></>}
        </div>
    )
}
