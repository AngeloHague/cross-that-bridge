import React, { useState } from 'react'
import Overlay from '../Overlay'
import { API, Auth } from 'aws-amplify';
import { createProject as createProjectMutation} from '../../graphql/mutations';
import { useDispatch } from 'react-redux';
import { ADD_PROJECT } from '../../util/redux/projectSlice'
import { useOverlay } from '../OverlayContext';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';

export const input_class_list = "my-3 py-2 px-4 rounded-xl text-black";

export default function AddProject({onSubmit}) {
  const dispatch = useDispatch();
  const { closeOverlay } = useOverlay();
  const [loading, setLoading] = useState(false);

    const handleClose = () => {
        closeOverlay(); 
    };

    async function createProject(event) {
      event.preventDefault();
      setLoading(true);
      const form = new FormData(event.target);
      const userInfo = await Auth.currentUserInfo();
      const data = {
        name: form.get("name"),
        description: form.get("description"),
        userId: userInfo.attributes.sub,
      };

      try {
        const res = await API.graphql({
          query: createProjectMutation,
          variables: { input: data },
        });
        console.log(res);
        dispatch(ADD_PROJECT(res.data.createProject));
        closeOverlay();
        // fetchProjectsFromAWS(dispatch)
      } catch (error) {
        console.error('Error creating project: ', error);
      }
      setLoading(false);
    }
    return (
        <Overlay title={"Add Project"}>
          <form className='px-8 mt-3' onSubmit={createProject}>
          <div className="flex flex-col justify-center">
            <input
              className={input_class_list}
              name="name"
              placeholder="Project title"
              label="Project Title"
              labelHidden
              variation="quiet"
              required
            />
            <textarea
              className={"h-40 " + input_class_list}
              name="description"
              placeholder="Description"
              label="Project Description"
              labelHidden
              variation="quiet"
              required
            />
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
