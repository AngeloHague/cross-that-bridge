import React from 'react'
import Overlay from '../Overlay'
import { API, Auth } from 'aws-amplify';
import { createProject as createProjectMutation} from '../../graphql/mutations';
import { useDispatch } from 'react-redux';
import { fetchProjectsFromAWS } from '../../util/aws-amplify';
import { ADD_PROJECT } from '../../util/redux/projectSlice'
import { useOverlay } from '../OverlayContext';

const input_class_list = "my-3 py-2 px-4 rounded-xl text-black";

export default function AddProject({onSubmit}) {
  const dispatch = useDispatch();
  const { closeOverlay } = useOverlay();

    const handleClose = () => {
        closeOverlay(); 
    };

    async function createProject(event) {
      event.preventDefault();
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
            <button type="submit" variation="primary">
              Create Note
            </button>
          </div>
        </form>
        </Overlay>
    )
}
