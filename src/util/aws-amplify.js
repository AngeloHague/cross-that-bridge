// awsService.js
import { Auth, API } from 'aws-amplify';
import { listProjects } from "../graphql/queries";
import {
  createProject as createProjectMutation,
  deleteProject as deleteProjectMutation,
} from "../graphql/mutations";
import { useDispatch } from 'react-redux';
import { SET_PROJECTS } from './redux/projectSlice';

// Fetch Projects from API
export async function fetchProjectsFromAWS(dispatch) {
    try {
        const apiData = await API.graphql({ query: listProjects });
        const projects = apiData.data.listProjects.items;
        dispatch(SET_PROJECTS(projects));
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
  }

//   async function createProject(event) {
//     event.preventDefault();
//     // Get the currently authenticated user
//     const user = await Auth.currentAuthenticatedUser();
//     // Form data
//     const form = new FormData(event.target);
//     const data = {
//       name: form.get("name"),
//       description: form.get("description"),
//       userId: user.attributes.sub, // sub is the Cognito user ID
//     };
//     await API.graphql({
//       query: createProjectMutation,
//       variables: { input: data },
//     });
//     fetchProjects();
//     event.target.reset();
//   }

//   async function deleteNote({ id }) {
//     const newNotes = projects.filter((note) => note.id !== id);
//     setProjects(newNotes);
//     await API.graphql({
//       query: deleteProjectMutation,
//       variables: { input: { id } },
//     });
//   }

// You can add more AWS-related functions here
