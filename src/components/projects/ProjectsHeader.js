import React from 'react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

const flex_center = "flex justify-center items-center ";

export default function ProjectsHeader({n_projects}) {
    return (
        <div className="App-Header flex p-5 gap-5 justify-center max-w-sm m-auto">
            <div className={"Project-Count shrink-0 soft-white rounded-xl w-32 h-32 aspect-square "+flex_center}>
                <p className="text-9xl">{n_projects}</p>
            </div>
            <div className="Header-buttons flex flex-wrap shrink-1 justify-evenly items-end">
                <h6 className="Projects-Header w-full uppercase text-2xl ">Projects</h6>
                <button className={"soft-white rounded-lg w-16 h-16 "+flex_center}><FeatherIcon icon="plus" width="30" height="30" /></button>
                <button className={"soft-white rounded-lg w-16 h-16 " + flex_center}><FeatherIcon icon="search" /></button>
            </div>
        </div>
    )
}
