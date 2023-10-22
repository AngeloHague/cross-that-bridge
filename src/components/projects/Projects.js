import React from 'react'
import RoundedButton from '../RoundedButton'

export default function ProjectsList({projects, setProject}) {
    return (
        <div className="w-full box-border px-8">
            {projects.map((project) => (
                <RoundedButton key={project.id} text={project.name} onClick={() => setProject(project)} />
            ))}
        </div>
    )
}
