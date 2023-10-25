// awsService.js
import { API, graphqlOperation } from 'aws-amplify';
import { getTodosByProjectId, listProjects, listTodos } from "../graphql/queries";
import { SET_PROJECTS, SET_TASKS } from './redux/projectSlice';
import { useSelector } from 'react-redux';

// Fetch Projects from API
export async function fetchProjectsFromAWS(dispatch) {
  console.log('Fetching project data from AWS...')
  try {
    const apiData = await API.graphql({ query: listProjects });
    const projects = apiData.data.listProjects.items;
    // cache data
    localStorage.setItem('cross-that-bridge/projects', JSON.stringify(projects));
    dispatch(SET_PROJECTS(projects));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function fetchTasksFromAWS(dispatch) {
  console.log('Fetching all tasks from AWS...')
  try {
    const apiData = await API.graphql({ query: listTodos });
    const projects = apiData.data.listTodos.items;
    // cache data
    console.log(projects)
    // localStorage.setItem('cross-that-bridge/projects', JSON.stringify(projects));
    // dispatch(SET_PROJECTS(projects));
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    throw error;
  }
}

export async function fetchTasksByProjectFromAWS(dispatch, projectId) {
  console.log('Fetching ' + projectId + ' tasks from AWS...');
  try {
    const filter  = {
      projectId: {
        contains: projectId
      }
    }
    const query = graphqlOperation(listTodos, { filter });
    const apiData = await API.graphql(query);
    console.log(apiData);
    const tasks = apiData.data.listTodos.items ? apiData.data.listTodos.items : [];
    console.log(tasks);
    dispatch(SET_TASKS(tasks));
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    throw error;
  }
}