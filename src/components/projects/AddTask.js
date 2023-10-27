import React, { useState } from 'react'
import Overlay from '../Overlay'
import { useDispatch } from 'react-redux';
import { useOverlay } from '../OverlayContext';
import { API, Auth } from 'aws-amplify';
import { createTodo as createTodoMutation } from '../../graphql/mutations';
import { input_class_list } from './AddProject';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { useSelector } from 'react-redux';
import { ADD_TASK } from '../../util/redux/projectSlice';

export default function AddTask() {
    const dispatch = useDispatch();
    const { closeOverlay } = useOverlay();
    const project = useSelector(state => state.projects.current);
    const tasks = (project && project.tasks) ? project.tasks : []
    const [loading, setLoading] = useState(false);

    async function addTask(event) {
        event.preventDefault();
        setLoading(true);
        const order = (tasks) ? tasks.length : 0;
        const userInfo = await Auth.currentUserInfo();
        const projectId = project.id;
        const form = new FormData(event.target);
        const data = {
            content: form.get("content"),
            order: order,
            projectId: projectId,
            userId: userInfo.attributes.sub,
        };
        try {
            const res = await API.graphql({
                query: createTodoMutation,
                variables: { input: data },
            });
            console.log(res);
            dispatch(ADD_TASK(res.data.createTodo));
            // console.log(project)
            closeOverlay();
        } catch (error) {
            console.error('Error creating Task: ', error);
        }
        setLoading(false);
    }

    return (
        <Overlay fill={false} title={"New Task"}>
            <form className='px-8 mt-3' onSubmit={addTask}>
                <div className="flex flex-col justify-center">
                    <input
                        className={input_class_list}
                        name="content"
                        placeholder="Task Criteria"
                        label="Task Criteria"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    {/* <textarea
                className={"h-40 " + input_class_list}
                name="description"
                placeholder={"- Task \n-- Subtask"}
                label="Project Description"
                labelHidden
                variation="quiet"
                required
                /> */}
                    <div className='relative'>
                        <button className='soft-white rounded-2xl flex mt-5 mb-8 w-full box-border p-3 pl-4 justify-between items-center' type="submit" variation="primary">
                            <p className='uppercase text-xl font-semibold'>Add Task</p>
                            <FeatherIcon icon={'check-circle'} />
                        </button>
                        {loading ? <div className='absolute inset-0 bg-grey-blue rounded-2xl mt-5 mb-8 w-full box-border p-3 pl-4 flex justify-center items-center'>
                            <div class="lds-dual-ring scale-50"></div>
                        </div> : <></>}
                    </div>
                </div>
            </form>
        </Overlay>
    )
}
